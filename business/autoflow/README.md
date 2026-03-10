# AutoFlow - Next.js Full Stack App

## Project Structure

```
autoflow/
├── app/
│   ├── layout.tsx          # Root layout with Clerk provider
│   ├── page.tsx            # Landing page (current)
│   ├── sign-in/[[...sign-in]]/page.tsx
│   ├── sign-up/[[...sign-up]]/page.tsx
│   ├── dashboard/
│   │   └── page.tsx        # User dashboard (protected)
│   └── api/
│       └── webhooks/
│           └── route.ts    # Webhooks for automation
├── components/
│   ├── AuthButton.tsx
│   ├── ReminderForm.tsx
│   ├── ClientList.tsx
│   └── Header.tsx
├── lib/
│   ├── supabase.ts         # Database client
│   └── twilio.ts           # SMS client
└── .env.local              # Environment variables
```

## To Deploy

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables:
   - CLERK_SECRET_KEY
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - TWILIO_PHONE_NUMBER
