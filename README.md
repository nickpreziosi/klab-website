# KLab Website

A modern, full-featured website for [K-Lab](https://k-lab.ai) — a financial technology infrastructure company. Built with Next.js 16, React 19, and TypeScript, featuring dynamic animations, contact forms with email integration, internationalization (en, es, pt, ar), and a responsive design.

## 🚀 Features

### Core Pages

- **Homepage** - Video background hero section with animated content
- **Company** - Team showcase, company culture, timeline, and statistics
- **Contact** - Hub plus three specialized forms: Sales, Support, Careers
- **Foundation** - KLab Foundation information
- **News** - Dynamic news articles with pagination and SEO-friendly URLs
- **Litepapers** - Multi-language documentation downloads
- **Technology Pages**:
  - **K Rails** - B2B blockchain payment infrastructure product showcase with dashboard demo
  - **Kena** - AI-powered platform with 3D avatar visualization and password-protected sections
  - **KABL**, **KAI**, **KAxis**, **KCard**, **KIM**, **KLeads**, **KBPM**, **KRisk**, **KTalk** - Additional product and solution pages

### Interactive Features

- 🌐 **Internationalization** - next-intl with locales: English, Spanish, Portuguese, Arabic
- 🎬 **Animations** - motion.dev (Framer Motion) for smooth page transitions and component animations
- 📱 **Responsive Design** - Responsive design with optimized layouts
- 🌙 **Dark/Light/System Theme** - Theme toggle functionality
- 📝 **Form Validation** - Client and server-side validation with Zod & React Hook Form
- 📧 **Email Integration** - Nodemailer for automated email sending
- 🔒 **reCAPTCHA** - Google reCAPTCHA v2 for form spam protection
- 📄 **File Uploads** - Support for resume/cover letter and support request attachments
- 🎭 **Lottie Animations** - JSON-based animations for interactive elements
- 🔔 **Toasts** - Sonner for notifications

## 🛠️ Technology Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization (i18n) and routing

### UI & Styling

- **CSS Modules** - Scoped styling for components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
  - Accordion, Dialog, Navigation Menu, Scroll Area, Separator, Tabs, Popover, etc.
- **[React Aria Components](https://react-spectrum.adobe.com/react-aria/)** - Accessible form components
  - TextField, ComboBox, ListBox, Checkbox, etc.
- **[Motion](https://motion.dev/)** (formerly Framer Motion) - Animation library

### Media

- **[Lottie React](https://lottiereact.com/)** - Lottie animation player
- **[@lottiefiles/lottie-player](https://www.lottiefiles.com/)** - Web component for Lottie animations
- **[Vimeo Player](https://github.com/vimeo/player.js)** - Video player integration

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- **[Zod](https://zod.dev/)** - Schema validation (v4)
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Zod resolver for React Hook Form
- **[react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha)** - Google reCAPTCHA integration

### Backend & Content

- **[Sanity](https://www.sanity.io/)** - Headless CMS for news/blog content; Sanity Studio at `/studio`
- **[Nodemailer](https://nodemailer.com/)** - Email sending for contact forms
- **Next.js API Routes** - Serverless API endpoints (contact, newsletter, kena-unlock)

### Utilities

- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component
- **[SVGO](https://github.com/svg/svgo)** - SVG optimization
- **[@svgr/webpack](https://react-svgr.com/)** - SVG to React component loader

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting (ESLint 9 + eslint-config-next)
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Turbopack](https://turbo.build/pack)** - Next-generation bundler (used with `--turbopack` flag for `dev` and `build`)

## 📁 Project Structure

```
klab-website/
├── public/                   # Static assets (images, videos, PDFs, Lottie, logos, locales)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # Locale-prefixed routes (en, es, pt, ar)
│   │   │   ├── company/      # Company page
│   │   │   ├── contact/      # Contact hub + sales, support, careers
│   │   │   ├── foundation/   # Foundation page
│   │   │   ├── litepapers/  # Litepapers page
│   │   │   ├── news/         # News feed, keo/klab sections, [slug] articles
│   │   │   └── technologies/ # krails, kena, kabl, kai, kaxis, kcard, kim, kleads, kbpm, krisk, ktalk
│   │   ├── api/              # API routes (contact, newsletter, kena-unlock)
│   │   ├── studio/           # Sanity Studio
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Root redirect
│   │   └── sitemap.ts        # Dynamic sitemap (k-lab.ai)
│   ├── i18n/                 # next-intl routing and config
│   ├── ui/                   # Presentation layer (views, components)
│   │   ├── shared/           # Shared components, hooks, utils, providers
│   │   └── {context}/        # Feature contexts (home, company, contact, news, kena, etc.)
│   ├── sanity/               # Sanity schema and queries
│   └── middleware.ts         # Locale redirect
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm** or **bun**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd klab-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Create environment file**

   Create a `.env.local` in the project root (or copy from `.env.local.example` if present) and add the variables listed in [Environment Variables](#-environment-variables).

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**  
   Navigate to [http://localhost:3000](http://localhost:3000). The app will use the default locale (e.g. `/en`).

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```env
# Sanity CMS (News/Blog content)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Google reCAPTCHA v2
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email (shared account for all contact forms)
NEXT_PUBLIC_EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Email - per-form recipients
NEXT_PUBLIC_SALES_RECIPIENT_EMAIL=sales@yourdomain.com
NEXT_PUBLIC_SUPPORT_RECIPIENT_EMAIL=support@yourdomain.com
NEXT_PUBLIC_CAREERS_RECIPIENT_EMAIL=careers@yourdomain.com

# Kena Password (optional, for password-protected sections)
KENA_PASSWORD=your_secret_password

NEXT_PUBLIC_SITE_URL=your_url_here

# HubSpot Newsletter
HUBSPOT_API_KEY=your_key_here

NEXT_PUBLIC_GA_MEASUREMENT_ID=your_id_here
```

### Getting reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register your site (use reCAPTCHA v2 "I'm not a robot" checkbox)
3. Add your domain and `localhost` for testing
4. Copy the Site Key (public) and Secret Key (private)

### Alternative Email Providers

For production, consider using:

- **SendGrid** - 100 emails/day free tier
- **AWS SES** - Pay-per-email service
- **Mailgun** - Developer-friendly API
- **Postmark** - Transactional email specialist

Update the transporter configuration in API routes (`src/app/api/contact/*/route.ts`) accordingly.

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack

# Production
npm run build            # Build for production with Turbopack
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run format           # Format code with Prettier
npm run format:check     # Check formatting with Prettier
npm run check-unused-css # Check for unused CSS
```

## 📝 Contact Forms

The website includes three specialized contact forms, each with distinct validation and email routing:

### Sales Form (`/contact/sales`)

- **Fields**: First Name, Last Name, Email, Phone, Company, Company Website, Country, Message
- **Email**: Sent to `NEXT_PUBLIC_SALES_RECIPIENT_EMAIL`

### Support Form (`/contact/support`)

- **Fields**: First Name, Last Name, Email, Phone, Message, File Attachments
- **File Uploads**: Up to 5 files (images, videos, PDFs) - 10MB max per file
- **Email**: Sent to `NEXT_PUBLIC_SUPPORT_RECIPIENT_EMAIL`

### Careers Form (`/contact/careers`)

- **Fields**: First Name, Last Name, Email, Phone, Position of Interest, Department, Message, Resume/Cover Letter
- **File Uploads**: Up to 3 files (PDF, DOC, DOCX, TXT) - 10MB max per file
- **Email**: Sent to `NEXT_PUBLIC_CAREERS_RECIPIENT_EMAIL`

### Form Features

- ✅ Client-side validation with React Hook Form + Zod
- ✅ Server-side validation with Zod schemas
- ✅ reCAPTCHA v2 spam protection
- ✅ File upload validation (type, size, count)
- ✅ HTML email templates with attachments
- ✅ Error handling and user feedback
- ✅ Success page

### Testing Forms

Test the contact forms manually in the browser at `/contact/sales`, `/contact/support`, and `/contact/careers`. All three use client- and server-side validation with Zod.

## 🎨 Styling

- **CSS Modules** - All component styles are scoped using CSS Modules
- **Global Styles** - Base styles and design tokens in `src/app/globals.css`
- **Responsive Design** - Mobile-first approach with breakpoints
- **Dark/Light Theme** - Theme toggle (class `dark` on `<html>`)

### CSS variables (`src/app/globals.css`)

Theme tokens, typography, layout, and component tokens are defined in `:root` and overridden in `html.dark` for dark mode. Use these in CSS Modules or inline styles so the app stays consistent and theme-aware.

| Category             | Variables                                                                                                                                                              | Usage                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **HSL theme tokens** | `--background`, `--foreground`, `--surface`, `--surface-hover`, `--surface-foreground`, `--accent`, `--accent-foreground`, `--muted`, `--muted-foreground`, `--border` | Use as `hsl(var(--background))` or `hsl(var(--foreground) / 0.5)` for opacity. Prefer these for new code. |
| **Legacy RGB**       | `--main-color-rgb`, `--main-color`, `--secondary-color-rgb`, `--secondary-color`, `--accent-color-rgb`, `--accent-color`                                               | Backward compatibility; prefer HSL tokens for new styles.                                                 |
| **Typography**       | `--text-xs` … `--text-9xl` (font size), `--font-thin` … `--font-black` (weight)                                                                                        | Type scale and weights.                                                                                   |
| **Layout**           | `--navbar-height`, `--margin-*`, `--padding-*`, `--gap-*` (xs/sm/md/lg/xl/2xl, plus `--padding-mobile`/`tablet`/`desktop`)                                             | Spacing and navbar height.                                                                                |
| **Effects**          | `--shadow-black`, `--rounded-full`, `--rounded-app`                                                                                                                    | Shadows and border radius (use `--rounded-app` for cards/buttons/inputs).                                 |
| **Card**             | `--card-bg`, `--card-foreground`, `--card-border`, `--card-border-radius`, `--card-shadow`, `--card-muted-foreground`, `--card-padding`                                | Card component tokens.                                                                                    |
| **Gradients**        | `--theme-gradient`                                                                                                                                                     | Page background gradient (overridden in dark mode).                                                       |
| **Toaster (Sonner)** | `.klab-toaster`: `--toast-success`, `--toast-error`, `--toast-warning`                                                                                                 | Toast colors; `.klab-toast*` classes use theme tokens.                                                    |

- **Dark theme**: `html.dark` overrides HSL tokens, legacy RGB, `--theme-gradient`, and card tokens so backgrounds and text follow the dark palette.
- **Transitions**: Theme switches use `html.no-transitions` to avoid flashing; elements with `data-allow-transition` keep transitions (e.g. cycle-toggle icons).

## 🚀 Deployment

Production site: **[k-lab.ai](https://k-lab.ai)**

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Environment Variables in Production

Make sure to add all environment variables in your hosting provider:

- Vercel: Project Settings → Environment Variables
- Other providers: Follow their specific documentation

## 🧪 Testing

- **Linting** – Run `npm run lint` (and `npm run lint:fix` if needed) before committing.
- **Formatting** – Run `npm run format:check` or `npm run format` to keep style consistent.

## 📚 Key Features Documentation

### Internationalization (i18n)

- **next-intl** with locales: `en`, `es`, `pt`, `ar` (see `src/i18n/routing.ts`)
- Locale-prefixed routes and cookie-based locale preference
- Content and UI strings localized via message files

### Animations

- **Motion** (motion package) for page and component animations
- Lottie JSON animations
- CSS-based animations

### Form Validation

- Zod v4 schemas for type-safe validation
- Real-time validation feedback
- Server-side validation on API routes for security

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` and `npm run format:check` (or `npm run format`)
4. Test your changes (including contact forms if relevant)
5. Submit a pull request

## 📄 License

[Add your license information here]

## 🔗 Links

- [K-Lab](https://k-lab.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Motion Documentation](https://motion.dev/)
- [Zod Documentation](https://zod.dev/)
- [Sanity Documentation](https://www.sanity.io/docs)

## 📞 Support

For issues or questions:

- Support Form: `/contact/support`
- Sales Inquiries: `/contact/sales`
- Career Opportunities: `/contact/careers`

---

Built using Next.js, React, and TypeScript
