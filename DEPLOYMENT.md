# EduModern Deployment Guide

This guide covers deploying EduModern to various platforms.

## Table of Contents

- [Docker Deployment](#docker-deployment)
- [Vercel (Frontend)](#vercel-frontend)
- [Railway (Backend)](#railway-backend)
- [Render (Full Stack)](#render-full-stack)
- [AWS Deployment](#aws-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)

## Prerequisites

Before deploying, ensure you have:

- ✅ Supabase project created
- ✅ Stripe account with API keys
- ✅ OpenAI API key
- ✅ Email service configured (SendGrid, AWS SES, or SMTP)
- ✅ Redis instance (Upstash, Redis Cloud, or self-hosted)

## Docker Deployment

### Local Docker Deployment

1. **Build and run with Docker Compose:**
```bash
docker-compose up -d
```

2. **Run database migrations:**
```bash
docker-compose exec api npm run prisma:migrate
```

3. **Access services:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Production Docker Deployment

1. **Update environment variables in `.env` files**

2. **Build production images:**
```bash
docker-compose -f docker-compose.yml build
```

3. **Deploy to your server:**
```bash
docker-compose -f docker-compose.yml up -d
```

4. **Set up reverse proxy (nginx):**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

5. **Enable SSL with Let's Encrypt:**
```bash
sudo certbot --nginx -d yourdomain.com
```

## Vercel (Frontend)

### Deploy Frontend to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Navigate to frontend directory:**
```bash
cd frontend
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Configure environment variables in Vercel dashboard:**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`

5. **Custom domain (optional):**
- Go to Vercel project settings
- Add your custom domain
- Update DNS records as instructed

## Railway (Backend)

### Deploy Backend to Railway

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Initialize project:**
```bash
cd api
railway init
```

4. **Add PostgreSQL:**
```bash
railway add postgresql
```

5. **Add Redis:**
```bash
railway add redis
```

6. **Set environment variables:**
```bash
railway variables set NODE_ENV=production
railway variables set PORT=5000
# Add all other variables from .env
```

7. **Deploy:**
```bash
railway up
```

8. **Run migrations:**
```bash
railway run npm run prisma:migrate
```

## Render (Full Stack)

### Deploy to Render

#### Backend Service

1. **Create new Web Service on Render**
2. **Connect GitHub repository**
3. **Configure:**
   - Name: `edumodern-api`
   - Environment: `Node`
   - Build Command: `cd api && npm install && npm run prisma:generate`
   - Start Command: `cd api && npm start`
   - Instance Type: Starter or higher

4. **Add environment variables** (see Environment Variables section)

5. **Add PostgreSQL database:**
   - Create new PostgreSQL instance
   - Copy connection string to `DATABASE_URL`

6. **Add Redis:**
   - Create new Redis instance
   - Copy connection string to `REDIS_URL`

#### Frontend Service

1. **Create new Static Site on Render**
2. **Connect GitHub repository**
3. **Configure:**
   - Name: `edumodern-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/.next`

4. **Add environment variables**

## AWS Deployment

### EC2 + RDS + ElastiCache

1. **Set up infrastructure:**
   - Launch EC2 instance (Ubuntu 22.04 LTS)
   - Create RDS PostgreSQL instance
   - Create ElastiCache Redis cluster
   - Configure Security Groups

2. **Install Docker on EC2:**
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
```

3. **Clone repository:**
```bash
git clone https://github.com/Ih205R/EduModern-Project.git
cd EduModern-Project
```

4. **Configure environment variables**

5. **Update docker-compose.yml** to use RDS and ElastiCache

6. **Deploy:**
```bash
sudo docker-compose up -d
```

### AWS Elastic Beanstalk (Alternative)

1. **Install EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize:**
```bash
eb init -p node.js edumodern
```

3. **Create environment:**
```bash
eb create edumodern-prod
```

4. **Set environment variables:**
```bash
eb setenv NODE_ENV=production DATABASE_URL=...
```

5. **Deploy:**
```bash
eb deploy
```

## Environment Variables

### Backend Environment Variables

```bash
# Application
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Supabase Database
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Supabase
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_51SWBzFEL42zCNFEU0voMYBcUoKLJAuLZmg4JcC2HusHcORcX2WAEWJXO2X8J9hy8rA25lgeHDvR4qDW4of9s8nGS00vbVa17Cl
STRIPE_PUBLISHABLE_KEY=pk_test_51SWBzFEL42zCNFEUp50HI8EljXvr4NeXAMMcvzx6Atjetodvq79YHV47zxMATKIuDQ5Sg2kEp4HHOIzNj8B0gKT100pOXODelJ
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_CURRENCY=eur

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4-turbo-preview

# Email
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
EMAIL_FROM=noreply@edumodern.com
EMAIL_FROM_NAME=EduModern

# Redis
REDIS_URL=redis://[username]:[password]@[host]:[port]

# Frontend
FRONTEND_URL=https://yourdomain.com

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### Frontend Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SWBzFEL42zCNFEUp50HI8EljXvr4NeXAMMcvzx6Atjetodvq79YHV47zxMATKIuDQ5Sg2kEp4HHOIzNj8B0gKT100pOXODelJ
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Database Setup

### Supabase Setup

1. **Create Supabase project:**
   - Go to https://supabase.com
   - Create new project
   - Copy connection string

2. **Enable required extensions:**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

3. **Run migrations:**
```bash
npm run prisma:migrate
```

### Local PostgreSQL (Development)

```bash
# Install PostgreSQL
sudo apt install postgresql

# Create database
sudo -u postgres createdb edumodern

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/edumodern
```

## Post-Deployment

### 1. Verify Deployment

- ✅ Frontend loads correctly
- ✅ API health check responds: `GET /health`
- ✅ Database connections work
- ✅ Redis connection works
- ✅ Email sending works
- ✅ Stripe webhooks configured

### 2. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://api.yourdomain.com/api/v1/orders/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 3. Set up Monitoring

- Configure error tracking (Sentry)
- Set up uptime monitoring
- Configure log aggregation
- Set up performance monitoring

### 4. Security Checklist

- ✅ HTTPS enabled
- ✅ Environment variables secured
- ✅ Rate limiting configured
- ✅ CORS properly configured
- ✅ Database credentials rotated
- ✅ API keys secured
- ✅ Firewall rules configured

### 5. Backup Strategy

1. **Database backups:**
   - Supabase: Automatic daily backups
   - Self-hosted: Configure pg_dump cron job

2. **File backups:**
   - Supabase Storage: Automatic backups
   - S3: Enable versioning

### 6. Performance Optimization

- Enable CDN for static assets
- Configure caching headers
- Optimize images
- Enable compression
- Use connection pooling

## Troubleshooting

### Common Issues

**Database connection fails:**
- Check DATABASE_URL format
- Verify network connectivity
- Check firewall rules
- Verify database credentials

**Stripe webhooks not working:**
- Verify webhook URL is accessible
- Check webhook secret
- Verify webhook events selected
- Check API logs for errors

**Redis connection fails:**
- Verify REDIS_URL format
- Check Redis server status
- Verify network connectivity

**Email sending fails:**
- Verify SMTP credentials
- Check email service status
- Verify sender domain configuration
- Check spam folder

## Support

For deployment issues:
- Open an issue on GitHub
- Email: support@edumodern.com
- Documentation: https://docs.edumodern.com

## Updates

To update deployed application:

```bash
git pull origin main
docker-compose down
docker-compose up -d --build
docker-compose exec api npm run prisma:migrate
```

---

For more information, see the main [README.md](./README.md)
