# EduModern Frontend Documentation

Next.js 15 frontend application for the EduModern platform.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context + Zustand
- **HTTP Client:** Axios
- **UI Components:** Radix UI
- **Forms:** React Hook Form
- **Validation:** Zod
- **Payments:** Stripe Elements

## Setup

### Install Dependencies
```bash
npm install
```

### Environment Variables
Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development
```bash
npm run dev  # Start dev server on port 3000
```

### Build
```bash
npm run build  # Build for production
npm start      # Start production server
```

## Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (grouped route)
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── dashboard/           # Dashboard pages
│   │   ├── workbooks/
│   │   └── settings/
│   ├── workbooks/           # Public workbook pages
│   ├── checkout/            # Checkout pages
│   ├── about/
│   ├── contact/
│   ├── page.tsx            # Homepage
│   └── layout.tsx          # Root layout
│
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Spinner.tsx
│   │   └── CookieConsent.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── workbooks/         # Workbook-specific components
│       ├── WorkbookCard.tsx
│       └── WorkbookGrid.tsx
│
├── lib/
│   ├── api/              # API client modules
│   │   ├── client.ts     # Axios instance
│   │   ├── auth.ts       # Auth endpoints
│   │   ├── workbooks.ts  # Workbooks endpoints
│   │   └── orders.ts     # Orders endpoints
│   ├── context/          # React Context
│   │   └── AuthContext.tsx
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── utils/            # Utility functions
│       ├── format.ts     # Formatters
│       └── cn.ts         # Class name utility
│
├── public/              # Static assets
│   └── fonts/           # Custom fonts
│
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Pages

### Public Pages
- `/` - Homepage
- `/about` - About Us
- `/contact` - Contact
- `/workbooks` - Browse workbooks
- `/workbooks/[slug]` - Workbook detail
- `/terms-of-service` - Terms of Service
- `/privacy-policy` - Privacy Policy
- `/cookie-policy` - Cookie Policy

### Authentication Pages (Group: `(auth)`)
- `/login` - Login
- `/register` - Register
- `/forgot-password` - Forgot Password
- `/reset-password` - Reset Password

### Dashboard Pages (Protected)
- `/dashboard` - Dashboard home
- `/dashboard/workbooks` - My workbooks
- `/dashboard/workbooks/new` - Create workbook
- `/dashboard/workbooks/[id]` - Edit workbook
- `/dashboard/settings` - Account settings

### Checkout Pages
- `/checkout/success` - Payment success
- `/checkout/cancel` - Payment cancelled

## Design System

### Colors (Tailwind Config)
```javascript
colors: {
  cream: '#F6F5F3',
  dark: '#1E1E1E',
  blue: '#8DA7D9',
  'gray-blue': '#D8DDE3',
  lavender: '#E2D4FF',
}
```

### Typography
- **Headings:** Montserrat ExtraBold
- **Subheadings:** Montserrat Medium
- **Body:** Cormorant Garamond

### Animations
All pages include smooth animations:
- `animate-fade-in-up` - Fade in from bottom
- `animate-fade-in-left` - Slide in from left
- `animate-fade-in-right` - Slide in from right
- `animate-scale-in` - Scale up entrance
- `hover-lift` - Lift on hover

## Components

### UI Components

#### Button
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg">
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`

#### Input
```tsx
import { Input } from '@/components/ui/Input';

<Input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

#### Card
```tsx
import { Card } from '@/components/ui/Card';

<Card className="p-6">
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

### Layout Components

#### Container
```tsx
import { Container } from '@/components/layout/Container';

<Container>
  <h1>Page Content</h1>
</Container>
```

Max width: 1200px, responsive padding

## State Management

### Auth Context
```tsx
import { useAuth } from '@/lib/context/AuthContext';

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth();

  return <div>Welcome {user?.name}</div>;
}
```

## API Integration

### Using API Clients
```tsx
import { workbooksAPI } from '@/lib/api/workbooks';

// Get workbooks
const { data } = await workbooksAPI.getAll({ page: 1, limit: 10 });

// Create workbook
const newWorkbook = await workbooksAPI.create({
  title: 'My Workbook',
  description: 'Description',
  price: 29.99
});
```

## Authentication Flow

1. User registers → Email verification sent
2. User logs in → Receives access + refresh tokens
3. Tokens stored in AuthContext
4. Protected routes check for valid user
5. Token refresh happens automatically

## Styling

### Tailwind CSS
Use Tailwind utility classes for styling:
```tsx
<div className="bg-cream rounded-lg p-6 shadow-lg">
  <h2 className="text-2xl font-bold text-dark">Title</h2>
</div>
```

### Custom Utilities
```tsx
import { cn } from '@/lib/utils/cn';

<div className={cn('base-class', isActive && 'active-class')}>
  Content
</div>
```

## Responsive Design

All pages are mobile-first and responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Use Tailwind breakpoints:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## SEO

Metadata is configured in each page:
```tsx
export const metadata: Metadata = {
  title: 'Page Title - EduModern',
  description: 'Page description',
};
```

## Type Safety

All API responses and props are typed:
```tsx
interface Workbook {
  id: string;
  title: string;
  price: number;
  // ...
}
```

## Testing

```bash
npm run type-check  # TypeScript check
npm run lint        # ESLint
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for deployment instructions.

## License

MIT
