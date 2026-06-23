# Calculate Future — India's #1 Financial Calculator Platform

A production-ready Next.js 16 application with 30+ financial calculators, live bank interest rates, PWA support, and SEO optimization.

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, Recharts
- **Database**: PostgreSQL + Prisma ORM
- **PWA**: Service Worker, Web App Manifest (installable on Android/iOS/Desktop)
- **Deployment**: Vercel

## Calculators

**Investment**: SIP, Step-Up SIP, Lumpsum, SWP, Retirement, FIRE, Inflation
**Deposits**: FD, RD, PPF (7.1%), Senior Citizen FD, Compound Interest
**Loans**: Home Loan EMI, Personal Loan, Car Loan, Loan Prepayment
**Tax**: Income Tax FY24-25, New vs Old Regime, Capital Gains (LTCG/STCG)

## Deploy to Vercel

1. Set env vars: `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`
2. Run `npm run db:push` to set up PostgreSQL schema
3. Deploy: `npx vercel --prod`

Recommended DBs: Neon (free tier), Supabase, Vercel Postgres
