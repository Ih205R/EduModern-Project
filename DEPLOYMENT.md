# 🚀 EduModern Deployment Guide

Complete guide for deploying EduModern to production.

## Prerequisites

- Supabase project
- Stripe account (production keys)
- OpenAI API key (optional)
- Email service (SendGrid, AWS SES, or SMTP)
- Domain name
- SSL certificate (automatically provided by most hosting platforms)

## Environment Setup

### 1. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your credentials from Project Settings → API:
   - Project URL
   - Anon/Public key
   - Service Role key
3. Get database connection string from Database Settings
4. Configure Storage buckets:
   - `avatars` - Public bucket for user avatars
   - `workbooks` - Public bucket for workbook covers
   - `pdfs` - Private bucket for PDF files

### 2. Stripe Configuration

1. Get production keys from [dashboard.stripe.com](https://dashboard.stripe.com)
2. Configure webhook endpoint:
   - URL: `https://your-api-domain.com/api/v1/orders/webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
3. Get webhook signing secret

### 3. OpenAI Configuration

1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Set usage limits to control costs
3. Choose model (default: `gpt-4-turbo-preview`)

### 4. Email Service

#### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
```

#### AWS SES
```env
EMAIL_HOST=email-smtp.region.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your_smtp_username
EMAIL_PASSWORD=your_smtp_password
```

## Deployment Options

### Option 1: Docker on VPS (Recommended)

#### Server Requirements
- 2 CPU cores minimum
- 4GB RAM minimum
- 50GB storage minimum
- Ubuntu 22.04 LTS or similar

#### Setup Steps

1. **Install Docker and Docker Compose**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo apt install docker-compose
```

2. **Clone Repository**
```bash
git clone https://github.com/Ih205R/EduModern-Project.git
cd EduModern-Project
```

3. **Configure Environment Variables**

Create `api/.env`:
```env
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Supabase (Production)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key

# JWT (Generate new secrets!)
JWT_SECRET=your_super_secret_production_jwt_key
JWT_REFRESH_SECRET=your_super_secret_production_refresh_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Stripe (Production keys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CURRENCY=eur

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview

# Email
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=EduModern

# Redis
REDIS_URL=redis://redis:6379

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

4. **Build and Start Services**
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

5. **Run Database Migrations**
```bash
docker-compose exec api npx prisma migrate deploy
```

6. **Configure Nginx Reverse Proxy**

Create `/etc/nginx/sites-available/edumodern`:
```nginx
# API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/edumodern /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Install SSL with Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

### Option 2: Vercel (Frontend) + Railway/Render (Backend)

#### Frontend on Vercel

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables in Vercel dashboard
5. Deploy

#### Backend on Railway

1. Create new project on [railway.app](https://railway.app)
2. Add PostgreSQL database (or link Supabase)
3. Add Redis service
4. Deploy from GitHub:
   - Root Directory: `api`
   - Start Command: `npm start`
5. Add environment variables
6. Run migrations: `npx prisma migrate deploy`

### Option 3: AWS (Complete)

#### Architecture
- EC2 for API (or ECS with Docker)
- S3 for static assets
- RDS for PostgreSQL (or Supabase)
- ElastiCache for Redis
- CloudFront for CDN
- Route 53 for DNS
- ALB for load balancing

See AWS deployment guide for detailed steps.

## Post-Deployment Checklist

### Security
- [ ] Change all default passwords and secrets
- [ ] Enable HTTPS everywhere
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Configure CSP headers
- [ ] Set up WAF (Web Application Firewall)

### Monitoring
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Configure logging (CloudWatch, Papertrail)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure performance monitoring (New Relic, Datadog)
- [ ] Set up alerts for critical issues

### Database
- [ ] Run migrations
- [ ] Set up automated backups
- [ ] Configure connection pooling
- [ ] Optimize indexes
- [ ] Set up read replicas (if needed)

### Payments
- [ ] Test Stripe webhook
- [ ] Verify payment flow
- [ ] Test refund process
- [ ] Configure email receipts

### Email
- [ ] Verify email delivery
- [ ] Test all email templates
- [ ] Configure SPF, DKIM, DMARC records
- [ ] Set up email monitoring

### Performance
- [ ] Enable Redis caching
- [ ] Configure CDN
- [ ] Optimize images
- [ ] Enable gzip compression
- [ ] Minimize bundle sizes

### Testing
- [ ] Test authentication flow
- [ ] Test payment process
- [ ] Test PDF generation
- [ ] Test email delivery
- [ ] Load testing
- [ ] Security testing

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, ALB)
- Multiple API instances
- Session store in Redis
- Stateless architecture

### Database Scaling
- Connection pooling (PgBouncer)
- Read replicas
- Database indexes
- Query optimization

### Caching Strategy
- Redis for sessions
- Redis for frequently accessed data
- CDN for static assets
- Browser caching headers

### Queue Management
- Separate worker processes
- Queue monitoring
- Failed job handling
- Job prioritization

## Backup Strategy

### Database Backups
- Daily automated backups
- Retention policy (30 days)
- Test restore process monthly
- Offsite backup storage

### File Storage Backups
- Supabase automatic backups
- Manual backups of critical files
- Version control for code

### Configuration Backups
- Environment variables
- Nginx configurations
- SSL certificates
- DNS records

## Disaster Recovery

1. **Database Recovery**
   - Restore from latest backup
   - Run migrations if needed
   - Verify data integrity

2. **Application Recovery**
   - Deploy from git repository
   - Restore environment variables
   - Restart services

3. **DNS Failover**
   - Secondary hosting ready
   - DNS TTL set appropriately
   - Automated health checks

## Maintenance

### Regular Updates
- Weekly dependency updates
- Monthly security patches
- Quarterly major updates

### Database Maintenance
- Weekly vacuum and analyze
- Monthly index optimization
- Quarterly full maintenance

### Monitoring Review
- Daily error log review
- Weekly performance review
- Monthly security audit

## Support

For deployment issues:
- Email: devops@edumodern.com
- Documentation: https://docs.edumodern.com
- GitHub Issues: https://github.com/Ih205R/EduModern-Project/issues

## License

MIT
