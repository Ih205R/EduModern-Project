# EduModern API Documentation

RESTful API for the EduModern educational workbook platform.

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** JWT
- **Payment:** Stripe
- **Storage:** Supabase Storage
- **AI:** OpenAI
- **Queue:** Bull + Redis

## Setup

### Install Dependencies
```bash
npm install
```

### Environment Variables
Copy `.env.example` to `.env` and update the values:

```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
REDIS_URL=redis://localhost:6379
```

### Database Setup
```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio  # Open Prisma Studio
```

### Development
```bash
npm run dev  # Start with nodemon
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/verify-email` | Verify email | ❌ |
| POST | `/forgot-password` | Request password reset | ❌ |
| POST | `/reset-password` | Reset password | ❌ |
| POST | `/refresh-token` | Refresh access token | ❌ |
| POST | `/logout` | Logout user | ✅ |
| GET | `/me` | Get current user | ✅ |

### Users (`/api/v1/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get user profile | ✅ |
| PUT | `/profile` | Update profile | ✅ |
| PUT | `/password` | Change password | ✅ |
| POST | `/avatar` | Upload avatar | ✅ |
| GET | `/workbooks` | Get user's workbooks | ✅ |
| GET | `/orders` | Get user's orders | ✅ |
| DELETE | `/account` | Delete account | ✅ |

### Workbooks (`/api/v1/workbooks`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | List all workbooks | ❌ |
| GET | `/slug/:slug` | Get workbook by slug | Optional |
| GET | `/:id` | Get workbook by ID | ✅ |
| POST | `/` | Create workbook | ✅ |
| PUT | `/:id` | Update workbook | ✅ |
| DELETE | `/:id` | Delete workbook | ✅ |
| POST | `/:id/cover` | Upload cover image | ✅ |
| POST | `/generate-content` | AI content generation | ✅ |
| POST | `/generate-titles` | AI title suggestions | ✅ |

### Orders (`/api/v1/orders`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/checkout` | Create checkout session | ✅ |
| POST | `/webhook` | Stripe webhook handler | ❌ |
| GET | `/:id` | Get order by ID | ✅ |
| GET | `/session/:sessionId` | Get order by session | ✅ |
| GET | `/:id/download` | Get download link | ✅ |

### PDF (`/api/v1/pdf`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/generate` | Queue PDF generation | ✅ |
| GET | `/status/:workbookId` | Check PDF status | ✅ |

## Request/Response Examples

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe",
  "role": "EDUCATOR"
}
```

Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "EDUCATOR"
    }
  }
}
```

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbG...",
    "refreshToken": "eyJhbG..."
  }
}
```

### Create Workbook
```bash
POST /api/v1/workbooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction to Calculus",
  "description": "Learn calculus fundamentals",
  "price": 29.99,
  "category": "Mathematics",
  "grade": "12",
  "subject": "Calculus"
}
```

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

## Authentication

JWT tokens are used for authentication. Include the access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Tokens expire after 15 minutes. Use the refresh token endpoint to get a new access token.

## Rate Limiting

- General API: 100 requests per 15 minutes
- Auth routes: 5 requests per 15 minutes
- Upload routes: 20 requests per hour
- Payment routes: 10 requests per hour

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

### Main Models

- **User** - User accounts
- **Workbook** - Educational workbooks
- **Order** - Purchase orders

## Testing

```bash
npm test                # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for production deployment instructions.

## License

MIT
