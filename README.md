# 📚 EduModern - Premium Educational Digital Workbook Platform

EduModern is a complete, production-ready full-stack platform that connects educators and students through high-quality digital workbooks. Educators can create, publish, and monetize their educational content, while students can discover and purchase learning materials.

![EduModern Platform](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue)

## ✨ Features

### For Educators
- 📝 **Content Creation** - Rich editor for creating educational workbooks
- 🤖 **AI-Powered** - OpenAI integration for content generation
- 📄 **PDF Generation** - Automatic PDF creation from workbook content
- 💰 **Monetization** - Secure payment processing with Stripe
- 📊 **Analytics** - Track views, sales, and revenue

### For Students
- 🔍 **Discovery** - Browse and search workbooks by category, grade, and subject
- 💳 **Secure Checkout** - Safe payment processing
- 📥 **Instant Access** - Download purchased workbooks immediately
- 📚 **Library** - Access all purchased content from your dashboard

### Platform Features
- 🔐 **Authentication** - Secure JWT-based auth with email verification
- 🎨 **Beautiful Design** - Modern UI with smooth animations
- 📱 **Responsive** - Optimized for all devices
- 🚀 **Performance** - Fast loading with Next.js 15
- 🔒 **Security** - Rate limiting, CORS, and Helmet protection

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Payments:** Stripe
- **Storage:** Supabase Storage
- **AI:** OpenAI API
- **Queue:** Bull + Redis
- **Email:** Nodemailer

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** React Context + Zustand
- **HTTP:** Axios
- **UI Components:** Radix UI

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Database:** Supabase
- **Cache/Queue:** Redis

## 📋 Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Docker and Docker Compose (optional)
- Supabase account
- Stripe account
- OpenAI API key (optional)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Ih205R/EduModern-Project.git
cd EduModern-Project
```

### 2. Set Up Environment Variables

#### API Environment Variables
Create `api/.env` from `api/.env.example`:

```bash
cd api
cp .env.example .env
```

Update the following critical variables:
- `DATABASE_URL` - Your Supabase PostgreSQL connection string
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `JWT_SECRET` - Generate a secure random string
- `JWT_REFRESH_SECRET` - Generate another secure random string
- `OPENAI_API_KEY` - Your OpenAI API key (optional)

Stripe keys are pre-configured for testing.

#### Frontend Environment Variables
Create `frontend/.env.local` from `frontend/.env.local.example`:

```bash
cd frontend
cp .env.local.example .env.local
```

The Stripe publishable key is pre-configured.

### 3. Install Dependencies

#### API
```bash
cd api
npm install
npx prisma generate
npx prisma migrate dev
```

#### Frontend
```bash
cd frontend
npm install
```

### 4. Start Development Servers

#### Using Docker Compose (Recommended)
```bash
docker-compose up
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- API on port 5000
- Frontend on port 3000

#### Manual Start

Terminal 1 - API:
```bash
cd api
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 3 - Redis (if not using Docker):
```bash
redis-server
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **API:** http://localhost:5000
- **API Health:** http://localhost:5000/health

## 📖 Documentation

- [API Documentation](./api/README.md) - Backend API details
- [Frontend Documentation](./frontend/README.md) - Frontend architecture
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment

## 🏗️ Project Structure

```
EduModern-Project/
├── api/                    # Backend API
│   ├── prisma/            # Database schema and migrations
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── jobs/          # Background jobs
│   ├── Dockerfile
│   └── package.json
│
├── frontend/              # Next.js Frontend
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── lib/              # Libraries and utilities
│   ├── public/           # Static assets
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml    # Docker orchestration
└── README.md            # This file
```

## 🎨 Design System

### Colors
- **Cream** (#F6F5F3) - Background
- **White** (#FFFFFF) - Cards, surfaces
- **Dark** (#1E1E1E) - Text, headers
- **Blue** (#8DA7D9) - Primary actions
- **Gray-blue** (#D8DDE3) - Borders, secondary
- **Lavender** (#E2D4FF) - Accents, highlights

### Typography
- **Headings:** Montserrat ExtraBold
- **Subheadings:** Montserrat Medium
- **Body:** Cormorant Garamond

## 🔐 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt (12 rounds)
- Rate limiting on all endpoints
- CORS configuration
- Helmet security headers
- Input validation with Joi
- SQL injection protection (Prisma)
- XSS protection

## 💳 Stripe Integration

The platform is pre-configured with test Stripe keys:

- **Publishable Key:** `pk_test_51SWBzFEL42zCNFEUp50HI8EljXvr4NeXAMMcvzx6Atjetodvq79YHV47zxMATKIuDQ5Sg2kEp4HHOIzNj8B0gKT100pOXODelJ`
- **Secret Key:** `sk_test_51SWBzFEL42zCNFEU0voMYBcUoKLJAuLZmg4JcC2HusHcORcX2WAEWJXO2X8J9hy8rA25lgeHDvR4qDW4of9s8nGS00vbVa17Cl`

Use test card: `4242 4242 4242 4242` with any future expiry and CVC.

## 🧪 Testing

### API Tests
```bash
cd api
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Type Checking
```bash
cd frontend
npm run type-check
npm run lint
```

## 📦 Building for Production

### API
```bash
cd api
npm run prisma:migrate
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Docker Production Build
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@edumodern.com or join our Slack channel.

## 🙏 Acknowledgments

- Supabase for database and storage
- Stripe for payment processing
- OpenAI for AI capabilities
- Vercel for Next.js framework
- All contributors and users

---

Built with ❤️ by the EduModern Team