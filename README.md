# KLab Website

A modern, full-featured website for KLab - a blockchain payment infrastructure company. Built with Next.js 15, React 19, and TypeScript, featuring dynamic animations, 3D graphics, contact forms with email integration, and a responsive design.

## 🚀 Features

### Core Pages

- **Homepage** - Video background hero section with animated content
- **Company Page** - Team showcase, company culture, timeline, and statistics
- **Technology Pages**:
  - **K Rails** - B2B blockchain payment infrastructure product showcase with interactive dashboard demo
  - **Kena AI** - AI-powered platform with 3D avatar visualization and password-protected sections
- **News/Blog** - Dynamic news articles with pagination and SEO-friendly URLs
- **Litepapers** - Multi-language documentation downloads
- **Contact Pages** - Three specialized contact forms (Sales, Support, Careers)

### Interactive Features

- 🎨 **3D Graphics** - React Three Fiber for 3D model rendering (Kena avatar)
- 🎬 **Animations** - Framer Motion for smooth page transitions and component animations
- 📱 **Responsive Design** - Mobile-first approach with optimized layouts
- 🌙 **Dark/Light Theme** - Theme toggle functionality
- 📝 **Form Validation** - Client and server-side validation with Zod
- 📧 **Email Integration** - Nodemailer for automated email sending
- 🔒 **reCAPTCHA** - Google reCAPTCHA v2 for form spam protection
- 📄 **File Uploads** - Support for resume/cover letter and support request attachments
- 🎭 **Lottie Animations** - JSON-based animations for interactive elements

## 🛠️ Technology Stack

### Core Framework

- **[Next.js 15.5.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### UI & Styling

- **CSS Modules** - Scoped styling for components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
  - Accordion, Dialog, Navigation Menu, Scroll Area, Separator
- **[React Aria Components](https://react-spectrum.adobe.com/react-aria/)** - Accessible form components
  - TextField, ComboBox, ListBox, Checkbox, etc.
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### 3D & Media

- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for React Three Fiber
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[Lottie React](https://lottiereact.com/)** - Lottie animation player
- **[@lottiefiles/lottie-player](https://www.lottiefiles.com/)** - Web component for Lottie animations
- **[Vimeo Player](https://github.com/vimeo/player.js)** - Video player integration

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Zod resolver for React Hook Form
- **[react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha)** - Google reCAPTCHA integration

### Backend & Email

- **[Nodemailer](https://nodemailer.com/)** - Email sending functionality
- **Next.js API Routes** - Serverless API endpoints

### Utilities

- **[Recharts](https://recharts.org/)** - Chart library for data visualization
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component
- **[SVGO](https://github.com/svg/svgo)** - SVG optimization
- **[@svgr/webpack](https://react-svgr.com/)** - SVG to React component loader

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[check-unused-css](https://github.com/purgecss/purgecss)** - CSS optimization tool
- **[Turbopack](https://turbo.build/pack)** - Next-generation bundler (used with `--turbopack` flag)

## 📁 Project Structure

```
keo-website/
├── public/                    # Static assets (images, videos, PDFs, Lottie files)
│   ├── lottie/               # Lottie animation files
│   └── ...
├── src/
│   └── app/
│       ├── api/              # API routes
│       │   ├── contact/      # Contact form endpoints
│       │   │   ├── sales/    # Sales inquiry API
│       │   │   ├── support/  # Support request API
│       │   │   └── careers/  # Career application API
│       │   └── kena-unlock/  # Kena password verification
│       ├── components/       # React components
│       │   ├── company/      # Company page components
│       │   ├── contact/      # Contact form components
│       │   ├── home/         # Homepage components
│       │   ├── kena/         # Kena AI page components
│       │   ├── k-rails/    # KRails page components
│       │   ├── news/         # News/blog components
│       │   └── ui/           # Reusable UI components
│       ├── company/          # Company page
│       ├── contact/          # Contact pages (sales, support, careers)
│       ├── litepapers/       # Litepapers page
│       ├── news/             # News/blog pages
│       ├── technologies/     # Technology showcase pages
│       ├── globals.css       # Global styles
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Homepage
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── test-forms.js            # Form API testing script
└── README.md                # This file
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
   cd keo-website
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

   Create a `.env.local` file in the root directory. See [Environment Variables](#-environment-variables) section for required variables.

4. **Configure environment variables** (see [Environment Variables](#environment-variables) section)

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```env
# Google reCAPTCHA v2
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email Configuration - Sales
SALES_EMAIL_USER=your_sales_email@gmail.com
SALES_EMAIL_PASSWORD=your_app_password_here
SALES_RECIPIENT_EMAIL=sales@yourdomain.com

# Email Configuration - Support
SUPPORT_EMAIL_USER=your_support_email@gmail.com
SUPPORT_EMAIL_PASSWORD=your_app_password_here
SUPPORT_RECIPIENT_EMAIL=support@yourdomain.com

# Email Configuration - Careers
CAREERS_EMAIL_USER=your_careers_email@gmail.com
CAREERS_EMAIL_PASSWORD=your_app_password_here
CAREERS_RECIPIENT_EMAIL=careers@yourdomain.com

# Kena Password (optional, for password-protected sections)
KENA_PASSWORD=your_secret_password
```

### Getting reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register your site (use reCAPTCHA v2 "I'm not a robot" checkbox)
3. Add your domain and `localhost` for testing
4. Copy the Site Key (public) and Secret Key (private)

### Gmail App Password Setup

If using Gmail for email sending:

1. Enable 2-Factor Authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in `*_EMAIL_PASSWORD` variables (not your regular password)

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
npm run check-unused-css # Check for unused CSS
```

## 📝 Contact Forms

The website includes three specialized contact forms, each with distinct validation and email routing:

### Sales Form (`/contact/sales`)

- **Fields**: First Name, Last Name, Email, Phone, Position, Company, Company Website, Company Type, Product Interest, Country, Message
- **Validation**: Domain/URL validation for company website (accepts `example.com` or `https://example.com`)
- **Email**: Sent to `SALES_RECIPIENT_EMAIL`

### Support Form (`/contact/support`)

- **Fields**: First Name, Last Name, Email, Phone, Issue Type, Product, Message, File Attachments
- **File Uploads**: Up to 5 files (images, videos, PDFs) - 10MB max per file
- **Email**: Sent to `SUPPORT_RECIPIENT_EMAIL`

### Careers Form (`/contact/careers`)

- **Fields**: First Name, Last Name, Email, Phone, Position of Interest, Department, Message, Resume/Cover Letter
- **File Uploads**: Up to 3 files (PDF, DOC, DOCX, TXT) - 10MB max per file
- **Email**: Sent to `CAREERS_RECIPIENT_EMAIL`

### Form Features

- ✅ Client-side validation with React Hook Form + Zod
- ✅ Server-side validation with Zod schemas
- ✅ reCAPTCHA v2 spam protection
- ✅ File upload validation (type, size, count)
- ✅ HTML email templates with attachments
- ✅ Error handling and user feedback
- ✅ Success animations and form reset

### Testing Forms

Run the automated test script:

```bash
# Make sure dev server is running
npm run dev

# In another terminal
node test-forms.js
```

See `FORM_VALIDATION_TEST.md` for comprehensive testing checklist.

## 🎨 Styling

- **CSS Modules** - All component styles are scoped using CSS Modules
- **Global Styles** - Base styles in `src/app/globals.css`
- **Responsive Design** - Mobile-first approach with breakpoints
- **Dark/Light Theme** - Theme toggle functionality

## 🚀 Deployment

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

### Form API Testing

The `test-forms.js` script tests all contact form API endpoints:

```bash
# Start dev server
npm run dev

# Run tests
node test-forms.js
```

### Manual Testing Checklist

See `FORM_VALIDATION_TEST.md` for comprehensive testing procedures covering:

- Client-side validation
- Server-side validation
- Email delivery
- File uploads
- Error handling

## 📚 Key Features Documentation

### 3D Graphics (Kena Avatar)

- Uses React Three Fiber and Three.js
- GLB model rendering
- Interactive 3D controls

### Animations

- Framer Motion for page transitions
- Lottie JSON animations
- CSS-based animations

### Form Validation

- Zod schemas for type-safe validation
- Real-time validation feedback
- Server-side validation for security

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Test your changes
5. Submit a pull request

## 📄 License

[Add your license information here]

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Zod Documentation](https://zod.dev/)

## 📞 Support

For issues or questions:

- Support Form: `/contact/support`
- Sales Inquiries: `/contact/sales`
- Career Opportunities: `/contact/careers`

---

Built with ❤️ using Next.js, React, and TypeScript
