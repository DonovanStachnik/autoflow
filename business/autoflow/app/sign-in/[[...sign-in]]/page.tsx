import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#000'
    }}>
      <SignIn 
        appearance={{
          elements: {
            rootBox: {
              backgroundColor: '#111',
              padding: '40px',
              borderRadius: '12px'
            }
          }
        }}
      />
    </div>
  )
}
