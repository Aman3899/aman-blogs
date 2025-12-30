# Aman Blogs

A modern, full-stack blog platform built with Next.js 14, Supabase, and TypeScript. Features authentication via email/password, Google OAuth, and passwordless magic links.

![Aman Blogs](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 🚀 Features

### Core Features
- ✅ **Paginated Blog Posts** - Homepage displays 5 posts per page with pagination
- ✅ **Post Details** - View full blog posts with author information
- ✅ **Create Posts** - Authenticated users can create new blog posts
- ✅ **ISR (Incremental Static Regeneration)** - Fast page loads with 60-second revalidation

### Authentication
- ✅ **Email/Password** - Traditional authentication
- ✅ **Google OAuth** - Social login via Supabase
- ✅ **Email OTP (Magic Links)** - Passwordless authentication
- ✅ **Profile Dropdown** - User profile with logout functionality

### Bonus Features
- ✅ **Form Validation** - Using Zod and React Hook Form
- ✅ **Optimistic UI** - Instant feedback when creating posts
- ✅ **Modern UI/UX** - Dark theme with glassmorphism and animations
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Row Level Security** - Database security via Supabase RLS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Date Formatting**: date-fns

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))
- Git installed

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd aman-blogs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### a) Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be set up (this takes about 2 minutes)

#### b) Run the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the SQL script

This will create:
- `profiles` table for user information
- `blog_posts` table for blog content
- Row Level Security policies
- Triggers for automatic profile creation
- Indexes for performance

#### c) Configure Authentication Providers

##### Email/Password (Already Enabled)
Email/password authentication is enabled by default in Supabase.

##### Google OAuth

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to configure
3. Follow the instructions to:
   - Create a Google Cloud Console project
   - Set up OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - Development: `http://localhost:3000/auth/callback`
     - Production: `https://yourdomain.com/auth/callback`
4. Copy the Client ID and Client Secret to Supabase
5. Enable the Google provider

##### Email OTP (Magic Links)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Under **Email Auth**, enable "Enable email confirmations"
4. Set the redirect URL to `http://localhost:3000/auth/callback` for development

### 4. Configure Environment Variables

1. Copy the example environment file:
```bash
cp env.example .env.local
```

2. Fill in your Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase dashboard under **Settings** → **API**.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
aman-blogs/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── auth/callback/        # OAuth callback handler
│   │   ├── create-post/          # Create post page (protected)
│   │   ├── login/                # Login page
│   │   ├── posts/[id]/           # Dynamic post detail pages
│   │   ├── signup/               # Sign up page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   ├── layout/               # Layout components
│   │   ├── posts/                # Post-related components
│   │   └── ui/                   # UI components
│   ├── lib/                      # Utilities and configurations
│   │   ├── api/                  # API functions
│   │   ├── supabase/             # Supabase clients
│   │   ├── utils.ts              # Utility functions
│   │   └── validations.ts        # Zod schemas
│   └── types/                    # TypeScript definitions
├── supabase/
│   └── schema.sql                # Database schema
├── middleware.ts                  # Next.js middleware
└── package.json
```

## 🔒 Authentication Flow

### Email/Password Flow
1. User signs up at `/signup`
2. Supabase sends confirmation email
3. User confirms email and can log in at `/login`
4. Session is managed via httpOnly cookies

### Google OAuth Flow
1. User clicks "Continue with Google"
2. Redirected to Google for authentication
3. Google redirects back to `/auth/callback`
4. User is authenticated and redirected to homepage

### Magic Link Flow
1. User enters email on login page
2. Selects "Magic Link" tab
3. Receives email with sign-in link
4. Clicks link, redirected to `/auth/callback`
5. Authenticated and redirected to homepage

## 🎨 Features Deep Dive

### Incremental Static Regeneration (ISR)

Both the homepage and post detail pages use ISR with a 60-second revalidation period:

```typescript
export const revalidate = 60
```

This means:
- Pages are statically generated at build time
- Updated every 60 seconds in production
- Fast page loads with fresh content

### Optimistic UI Updates

When creating a post, the UI updates immediately before the server responds:

```typescript
setOptimisticPost({ title, body, author_id })
// Submit to server
// Redirect to new post
```

This provides instant feedback to users.

### Row Level Security (RLS)

All database operations are secured with RLS policies:
- Anyone can read posts and profiles
- Only authenticated users can create posts
- Users can only edit/delete their own posts

### Form Validation

All forms use Zod schemas for type-safe validation:

```typescript
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(10)
})
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project to Vercel
3. Add environment variables in Vercel dashboard
4. Update Supabase OAuth redirect URLs to include your Vercel domain
5. Deploy!

### Update Auth Redirect URLs

After deployment, update your OAuth redirect URLs in:
- Supabase dashboard → Authentication → URL Configuration
- Google Cloud Console (for Google OAuth)

Add your production URLs:
```
https://your-domain.vercel.app/auth/callback
```

## 📝 Database Schema

### Profiles Table
- Stores user information
- Automatically created on signup via trigger
- Linked to Supabase Auth users

### Blog Posts Table
- Stores blog post content
- Auto-generated excerpt (first 200 characters)
- Foreign key to profiles for author

## 🤝 Contributing

This is a take-home assignment project. For the evaluation, please:
1. Review the code structure
2. Test all authentication methods
3. Verify pagination and ISR functionality
4. Check form validation and error handling

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Developer

Built by **Aman** as part of a Next.js development assessment.

**Repository**: Shared with GitHub username: `ahsang`

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify your Supabase URL and key in `.env.local`
- Check that you've run the `schema.sql` script

### Google OAuth Not Working
- Ensure redirect URIs are correctly configured
- Check that Google OAuth is enabled in Supabase

### Posts Not Displaying
- Make sure you've created at least one post
- Check browser console for errors
- Verify RLS policies are set up correctly

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

---

**Need Help?** Check the Supabase documentation or Next.js docs for more information.
