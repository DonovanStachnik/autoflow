import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main>
      <header>
        <div className="container">
          <nav>
            <Link href="/" className="logo">AutoFlow</Link>
            <div className="nav-links">
              <Link href="#features">Features</Link>
              <Link href="#pricing">Pricing</Link>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn btn-secondary">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="btn">Dashboard</Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Never Lose a Client<br />to No-Shows Again</h1>
          <p>
            Automated text and email reminders for your business. 
            Connect your booking calendar and let AutoFlow handle the rest.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn">Get Started Free</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="btn">Go to Dashboard</Link>
          </SignedIn>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2>Why AutoFlow?</h2>
          <div className="feature-grid">
            <div className="card feature-card">
              <h3>📱 SMS Reminders</h3>
              <p>Automated text messages to clients 24 hours before their appointment.</p>
            </div>
            <div className="card feature-card">
              <h3>📧 Email Follow-ups</h3>
              <p>Professional email reminders and review requests after appointments.</p>
            </div>
            <div className="card feature-card">
              <h3>🔗 Easy Integration</h3>
              <p>Connect with Calendly, Square, MindBody, and more in just a few clicks.</p>
            </div>
            <div className="card feature-card">
              <h3>📊 Dashboard</h3>
              <p>See your no-show rates, client history, and reminder stats at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="container">
          <h2>Simple Pricing</h2>
          <div className="pricing-grid">
            <div className="card pricing-card">
              <h3>Starter</h3>
              <div className="price">$29<span>/month</span></div>
              <ul className="pricing-features">
                <li>Up to 50 clients</li>
                <li>100 SMS reminders/month</li>
                <li>Email support</li>
              </ul>
              <Link href="/dashboard" className="btn btn-secondary">Get Started</Link>
            </div>
            <div className="card pricing-card featured">
              <h3>Professional</h3>
              <div className="price">$49<span>/month</span></div>
              <ul className="pricing-features">
                <li>Up to 200 clients</li>
                <li>500 SMS reminders/month</li>
                <li>Priority support</li>
                <li>Custom reminder times</li>
              </ul>
              <Link href="/dashboard" className="btn">Get Started</Link>
            </div>
            <div className="card pricing-card">
              <h3>Business</h3>
              <div className="price">$99<span>/month</span></div>
              <ul className="pricing-features">
                <li>Unlimited clients</li>
                <li>Unlimited SMS</li>
                <li>24/7 support</li>
                <li>API access</li>
              </ul>
              <Link href="/dashboard" className="btn btn-secondary">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2026 AutoFlow. Built for local businesses.</p>
        </div>
      </footer>
    </main>
  )
}
