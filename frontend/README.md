# EduModern Frontend

Modern, responsive frontend for the EduModern educational platform built with Next.js 15.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **HTTP Client**: Axios
- **UI Components**: Radix UI
- **Forms**: React Hook Form
- **Validation**: Zod
- **Payments**: Stripe.js

## Features

- ✨ Modern, animated UI
- 📱 Fully responsive design
- 🎨 Custom design system
- ♿ Accessible components
- 🔒 Secure authentication
- 🍪 Cookie consent
- 🌐 SEO optimized
- ⚡ Fast page loads

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── dashboard/         # User dashboard
│   │   ├── workbooks/
│   │   └── settings/
│   ├── workbooks/         # Browse workbooks
│   ├── checkout/          # Checkout flow
│   ├── about/
│   ├── contact/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── workbooks/        # Workbook components
├── lib/                  # Libraries & utilities
│   ├── api/              # API client
│   ├── context/          # React Context
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── public/               # Static files
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Pages

### Public Pages
- `/` - Homepage with hero section
- `/workbooks` - Browse all workbooks
- `/workbooks/[slug]` - Workbook detail page
- `/about` - About page
- `/contact` - Contact page
- `/terms-of-service` - Terms of Service
- `/privacy-policy` - Privacy Policy
- `/cookie-policy` - Cookie Policy

### Authentication Pages
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset

### Dashboard Pages (Protected)
- `/dashboard` - Main dashboard
- `/dashboard/workbooks` - My workbooks
- `/dashboard/workbooks/new` - Create new workbook
- `/dashboard/workbooks/[id]/edit` - Edit workbook
- `/dashboard/settings` - Account settings

### Checkout Pages
- `/checkout/success` - Payment success
- `/checkout/cancel` - Payment cancelled

## Components

### UI Components

Located in `components/ui/`:
- `Button` - Styled button with variants
- `Input` - Form input field
- `Textarea` - Multi-line text input
- `Card` - Container card
- `Modal` - Modal dialog
- `Toast` - Notification toast
- `Spinner` - Loading spinner
- `CookieConsent` - Cookie consent popup

### Layout Components

Located in `components/layout/`:
- `Header` - Navigation header
- `Footer` - Site footer
- `Container` - Max-width container

### Workbook Components

Located in `components/workbooks/`:
- `WorkbookCard` - Workbook preview card
- `WorkbookGrid` - Grid of workbook cards

## Styling

### Design System

Colors defined in `tailwind.config.js`:
```js
colors: {
  cream: '#F6F5F3',
  dark: '#1E1E1E',
  blue: '#8DA7D9',
  'gray-blue': '#D8DDE3',
  lavender: '#E2D4FF',
}
```

Fonts:
- Headings: Montserrat ExtraBold
- Body: Cormorant Garamond

### Animations

Defined in `globals.css`:
- `animate-fade-in-up`
- `animate-fade-in-left`
- `animate-fade-in-right`
- `animate-scale-in`
- `animate-bounce-in`
- `hover-lift`
- `hover-glow`

Usage:
```jsx
<div className="animate-fade-in-up hover-lift">
  Content
</div>
```

## API Integration

API client located in `lib/api/`:

```typescript
import { authApi } from '@/lib/api/auth';
import { workbooksApi } from '@/lib/api/workbooks';
import { ordersApi } from '@/lib/api/orders';

// Example usage
const user = await authApi.login(email, password);
const workbooks = await workbooksApi.getAll();
const order = await ordersApi.create(workbookIds);
```

## Authentication

Using React Context for auth state:

```typescript
import { useAuth } from '@/lib/context/AuthContext';

function MyComponent() {
  const { user, login, logout, loading } = useAuth();
  
  if (loading) return <Spinner />;
  
  return user ? <Dashboard /> : <Login />;
}
```

## Environment Variables

Required environment variables:

```env
# API endpoint
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Stripe publishable key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

Or build Docker image:
```bash
docker build -t edumodern-frontend .
docker run -p 3000:3000 edumodern-frontend
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Docker

Use provided `Dockerfile`:
```bash
docker build -t edumodern-frontend .
docker run -p 3000:3000 edumodern-frontend
```

### Other Platforms

Compatible with:
- Netlify
- AWS Amplify
- Railway
- Render

## Performance

- Server-side rendering (SSR)
- Static generation where possible
- Optimized images with Next.js Image
- Code splitting
- Lazy loading
- Minimal bundle size

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

MIT

## Support

For issues or questions:
- GitHub Issues
- Email: support@edumodern.com
