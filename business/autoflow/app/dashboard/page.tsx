'use client'

import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase (replace with your own keys)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

interface ReminderSettings {
  id?: number
  business_name: string
  phone: string
  reminder_time: number // hours before appointment
  sms_enabled: boolean
  email_enabled: boolean
}

export default function Dashboard() {
  const { isSignedIn, user } = useUser()
  const [settings, setSettings] = useState<ReminderSettings>({
    business_name: '',
    phone: '',
    reminder_time: 24,
    sms_enabled: true,
    email_enabled: true
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [clients, setClients] = useState(0)
  const [reminders, setReminders] = useState(0)

  useEffect(() => {
    if (isSignedIn && user?.id) {
      loadSettings()
    }
  }, [isSignedIn, user])

  async function loadSettings() {
    if (!user?.id) return
    
    const { data } = await supabase
      .from('businesses')
      .select('*')
      .eq('clerk_id', user.id)
      .single()
    
    if (data) {
      setSettings(data)
      setClients(data.client_count || 0)
      setReminders(data.reminder_count || 0)
    }
  }

  async function saveSettings() {
    if (!user?.id) return
    
    setSaving(true)
    
    const { error } = await supabase
      .from('businesses')
      .upsert({
        clerk_id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        ...settings
      }, { onConflict: 'clerk_id' })
    
    setSaving(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  if (!isSignedIn) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1>Please Sign In</h1>
        <p style={{ margin: '20px 0', color: '#a0a0a0' }}>
          Sign in to access your AutoFlow dashboard
        </p>
        <SignInButton mode="modal">
          <button className="btn">Sign In</button>
        </SignInButton>
      </div>
    )
  }

  return (
    <main>
      <header>
        <div className="container">
          <nav>
            <Link href="/" className="logo">AutoFlow</Link>
            <div className="nav-links">
              <span style={{ color: '#a0a0a0' }}>{user?.emailAddresses[0]?.emailAddress}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </div>
      </header>

      <div className="container dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="stats-grid">
          <div className="card stat-card">
            <div className="stat-number">{clients}</div>
            <div className="stat-label">Active Clients</div>
          </div>
          <div className="card stat-card">
            <div className="stat-number">{reminders}</div>
            <div className="stat-label">Reminders Sent</div>
          </div>
          <div className="card stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">No-Shows Prevented</div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '30px' }}>Reminder Settings</h2>
          
          <label>Business Name</label>
          <input
            type="text"
            value={settings.business_name}
            onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
            placeholder="Your Business Name"
          />

          <label>Business Phone (for SMS)</label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            placeholder="+1234567890"
          />

          <label>Reminder Time (hours before appointment)</label>
          <select
            value={settings.reminder_time}
            onChange={(e) => setSettings({ ...settings, reminder_time: parseInt(e.target.value) })}
          >
            <option value={12}>12 hours before</option>
            <option value={24}>24 hours before</option>
            <option value={48}>48 hours before</option>
          </select>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.sms_enabled}
                onChange={(e) => setSettings({ ...settings, sms_enabled: e.target.checked })}
                style={{ width: 'auto', margin: 0 }}
              />
              Enable SMS Reminders
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.email_enabled}
                onChange={(e) => setSettings({ ...settings, email_enabled: e.target.checked })}
                style={{ width: 'auto', margin: 0 }}
              />
              Enable Email Reminders
            </label>
          </div>

          <button className="btn" onClick={saveSettings} disabled={saving}>
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </main>
  )
}

import Link from 'next/link'
