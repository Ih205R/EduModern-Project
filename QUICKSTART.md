# 🚀 EduModern Quick Start Guide

Get EduModern up and running in 5 minutes!

## Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose (recommended)
- Supabase account (free tier works)
- Stripe account (test mode)

## 1. Clone & Setup

```bash
git clone https://github.com/Ih205R/EduModern-Project.git
cd EduModern-Project
```

## 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get your credentials from Settings → API:
   - Project URL
   - Anon/Public key
   - Service Role key
   - Database URL from Settings → Database

3. Create Storage Buckets:
   - `avatars` (public)
   - `workbooks` (public)
   - `pdfs` (private)

## 3. Set Environment Variables

### Backend (`api/.env`)

```bash
cd api
cp .env.example .env
```

Edit `api/.env` and add:

```env
# Your Supabase credentials
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Generate secure random strings for these
JWT_SECRET=your_random_secret_here
JWT_REFRESH_SECRET=your_random_refresh_secret_here

# Optional: Add your OpenAI key for AI features
OPENAI_API_KEY=sk-your-openai-key
```

### Frontend (`frontend/.env.local`)

```bash
cd ../frontend
cp .env.local.example .env.local
```

The Stripe test key is already configured. No changes needed!

## 4. Start with Docker (Recommended)

From the project root:

```bash
docker-compose up -d
```

This starts:
- PostgreSQL (if not using Supabase)
- Redis
- API on http://localhost:5000
- Frontend on http://localhost:3000

## 5. Initialize Database

```bash
cd api
npm install
npx prisma generate
npx prisma migrate dev
```

## 6. Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **API Health**: http://localhost:5000/health

## Alternative: Manual Start

If you prefer not to use Docker:

### Terminal 1 - Redis
```bash
redis-server
```

### Terminal 2 - API
```bash
cd api
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Terminal 3 - Frontend
```bash
cd frontend
npm install
npm run dev
```

## Test Stripe Payments

Use these test card details:
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

## Create Your First Account

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Choose "Educator" role
4. Verify your email (check console logs if email isn't configured)
5. Create your first workbook!

## Troubleshooting

### Database Connection Error
- Verify Supabase credentials in `api/.env`
- Check DATABASE_URL format
- Ensure Supabase project is active

### Frontend Won't Start
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### API Port Already in Use
Change `PORT=5000` to another port in `api/.env`

### Redis Connection Error
- Make sure Redis is running
- Check REDIS_URL in `api/.env`

## Next Steps

1. **Configure Email** - Set up SendGrid or SMTP for email notifications
2. **Add OpenAI Key** - Enable AI content generation features
3. **Customize Design** - Edit `tailwind.config.js` for your brand colors
4. **Add Content** - Create workbooks and start selling!

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🔧 [API Reference](./api/README.md)
- 🎨 [Frontend Guide](./frontend/README.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)

## Production Deployment

When ready to deploy:

1. Update all environment variables with production values
2. Generate new JWT secrets
3. Use Stripe production keys
4. Configure production Supabase project
5. Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

---

Happy building! 🎓✨
