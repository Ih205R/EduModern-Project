# EduModern API

Backend API for the EduModern educational digital workbook platform.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: JWT
- **Payments**: Stripe
- **Storage**: Supabase Storage
- **AI**: OpenAI GPT-4
- **Job Queue**: Bull (Redis)
- **Email**: Nodemailer

## Features

- ✅ User authentication (register, login, JWT tokens)
- ✅ Email verification and password reset
- ✅ Workbook CRUD operations
- ✅ AI-powered content generation
- ✅ PDF generation with background jobs
- ✅ Stripe payment integration
- ✅ Secure file uploads to Supabase Storage
- ✅ Order management and download links
- ✅ Rate limiting and security middleware

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL (or Supabase account)
- Redis (for job queue)
- Stripe account
- OpenAI API key
- Email service (SendGrid, AWS SES, or SMTP)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- Supabase database URL and keys
- Stripe keys (already configured)
- OpenAI API key
- Email service credentials
- Redis URL

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

5. (Optional) Seed database:
```bash
npm run prisma:seed
```

## Development

Start development server with auto-reload:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Production

Start production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed database with sample data
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/verify-email?token=xxx` - Verify email
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `POST /api/v1/auth/change-password` - Change password (authenticated)
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `DELETE /api/v1/users/account` - Delete user account
- `GET /api/v1/users/workbooks` - Get user's workbooks
- `GET /api/v1/users/purchases` - Get user's purchases
- `POST /api/v1/users/avatar` - Upload avatar

### Workbooks
- `GET /api/v1/workbooks` - Get all workbooks (public)
- `GET /api/v1/workbooks/:slug` - Get workbook by slug
- `POST /api/v1/workbooks` - Create workbook (educator)
- `PUT /api/v1/workbooks/:id` - Update workbook (owner)
- `DELETE /api/v1/workbooks/:id` - Delete workbook (owner)
- `POST /api/v1/workbooks/:id/publish` - Publish workbook
- `POST /api/v1/workbooks/:id/cover` - Upload cover image
- `POST /api/v1/workbooks/generate` - Generate AI content

### Orders
- `POST /api/v1/orders/checkout` - Create checkout session
- `POST /api/v1/orders/webhook` - Stripe webhook
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get order by ID
- `GET /api/v1/orders/:orderId/download/:workbookId` - Generate download link

### PDF Generation
- `POST /api/v1/pdf/:workbookId` - Generate PDF
- `GET /api/v1/pdf/status/:jobId` - Get PDF generation status

## Database Schema

### User
- Authentication and profile information
- Roles: STUDENT, EDUCATOR, ADMIN

### Workbook
- Title, description, content
- Pricing and metadata
- Status: DRAFT, PUBLISHED, ARCHIVED

### Order
- Payment information
- Status: PENDING, PROCESSING, COMPLETED, CANCELLED, REFUNDED

### OrderItem
- Individual workbooks in an order
- Download tracking

### PDFJob
- Background PDF generation tracking

## Security

- JWT tokens with refresh token rotation
- Password hashing with bcrypt
- Rate limiting on all endpoints
- CORS configuration
- Helmet security headers
- Input validation with express-validator
- SQL injection protection via Prisma

## Error Handling

All errors follow a consistent format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## Docker

Build image:
```bash
docker build -t edumodern-api .
```

Run container:
```bash
docker run -p 5000:5000 --env-file .env edumodern-api
```

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
