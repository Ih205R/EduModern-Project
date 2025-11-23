# EduModern - Educational Digital Workbook Platform

A complete, production-ready full-stack application for creating, publishing, and monetizing educational content.

## 🎯 Overview

EduModern is a premium educational platform where educators can create and publish high-quality workbooks, and students can discover and purchase learning materials. Built with modern technologies and best practices.

## ✨ Features

### For Educators
- 📚 Create and manage digital workbooks
- 🤖 AI-powered content generation (OpenAI GPT-4)
- 💰 Monetize educational content
- 📊 Dashboard with analytics
- 🎨 Custom cover images
- 📄 Automatic PDF generation

### For Students
- 🔍 Browse and search workbooks
- 💳 Secure payment with Stripe
- ⬇️ Instant digital downloads
- 📱 Responsive mobile experience
- 🔐 Secure account management

### Platform Features
- 🔒 JWT-based authentication
- 📧 Email verification and password reset
- 🎨 Modern, accessible UI with smooth animations
- 🌐 SEO optimized
- 🐳 Docker ready
- 🔄 Real-time updates
- 🍪 GDPR-compliant cookie consent

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: JWT
- **Payments**: Stripe
- **Storage**: Supabase Storage
- **AI**: OpenAI GPT-4
- **Queue**: Bull (Redis)
- **Email**: Nodemailer

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context
- **HTTP**: Axios
- **UI Components**: Radix UI

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: Supabase
- **Cache/Queue**: Redis

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose (optional)
- Supabase account
- Stripe account
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ih205R/EduModern-Project.git
cd EduModern-Project
```

2. **Set up Backend**
```bash
cd api
cp .env.example .env
# Edit .env with your credentials
npm install
npm run prisma:generate
npm run prisma:migrate
```

3. **Set up Frontend**
```bash
cd ../frontend
cp .env.local.example .env.local
# Edit .env.local with your API URL
npm install
```

4. **Run with Docker (Recommended)**
```bash
# From project root
docker-compose up -d
```

Or run manually:

```bash
# Terminal 1 - Backend
cd api
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

## 📁 Project Structure

```
EduModern-Project/
├── api/                    # Backend API
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── jobs/          # Background jobs
│   ├── prisma/           # Database schema & migrations
│   └── Dockerfile        # Backend container config
├── frontend/              # Next.js frontend
│   ├── app/              # Next.js 15 app directory
│   ├── components/       # React components
│   ├── lib/              # Libraries & utilities
│   └── Dockerfile        # Frontend container config
├── docker-compose.yml    # Multi-container orchestration
└── README.md            # This file
```

## 🔧 Configuration

### Required Environment Variables

#### Backend (.env)
```env
# Supabase
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# JWT
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Stripe (Pre-configured)
STRIPE_SECRET_KEY=sk_test_51SWBzFEL42zCNFEU0voMYBcUoKLJAuLZmg4JcC2HusHcORcX2WAEWJXO2X8J9hy8rA25lgeHDvR4qDW4of9s8nGS00vbVa17Cl

# OpenAI
OPENAI_API_KEY=sk-...

# Email
EMAIL_HOST=smtp.sendgrid.net
EMAIL_USER=apikey
EMAIL_PASSWORD=...

# Redis
REDIS_URL=redis://localhost:6379
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SWBzFEL42zCNFEUp50HI8EljXvr4NeXAMMcvzx6Atjetodvq79YHV47zxMATKIuDQ5Sg2kEp4HHOIzNj8B0gKT100pOXODelJ
```

## 📖 API Documentation

Comprehensive API documentation is available in [api/README.md](./api/README.md)

## 🎨 Design System

### Colors
- **Cream**: `#F6F5F3` - Background
- **White**: `#FFFFFF` - Cards, surfaces
- **Dark**: `#1E1E1E` - Text, headers
- **Blue**: `#8DA7D9` - Primary actions
- **Gray-blue**: `#D8DDE3` - Borders, secondary
- **Lavender**: `#E2D4FF` - Accents, highlights

### Typography
- **Headings**: Montserrat ExtraBold
- **Subheadings**: Montserrat Medium
- **Body**: Cormorant Garamond

## 🧪 Testing

```bash
# Backend tests
cd api
npm test

# Frontend tests
cd frontend
npm test
```

## 🏗 Building for Production

```bash
# Use docker-compose
docker-compose up --build -d
```

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔒 Security

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on all endpoints
- CORS protection
- Helmet security headers
- Input validation
- SQL injection protection via Prisma

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the EduModern team