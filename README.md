# 🌟 Aman Blogs

A premium, full-stack blog platform built with **Next.js 15**, **Supabase**, and **TypeScript**. Designed with a focus on high-end aesthetics, performance, and a seamless authoring experience.

![Aman Blogs](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🚀 Features

### Core Capabilities
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop.
- 📜 **Infinite-Style Pagination** - Smooth navigation through blog archives.
- ✍️ **Rich Text Authoring** - Integrated Markdown editor with live preview.
- ⚡ **Lightning Fast** - Powered by Next.js Server Components and ISR.

### 🔐 Authentication Suite
- **Email/Password** - Secure traditional login.
- **Google OAuth** - One-click social authentication.
- **Magic Links** - Passwordless, secure email OTP.
- **Session Persistence** - Modern auth handling via `@supabase/ssr`.

### ✨ Premium Bonus Features
- **Optimistic UI** - Immediate visual feedback when publishing posts before server confirmation.
- **Incremental Static Regeneration (ISR)** - Content remains fresh (60s revalidation) while serving world-class performance.
- **Advanced UI/UX** - Custom glassmorphism components, cinematic animations, and a focus on typography.
- **Type-Safe Ecosystem** - End-to-end type safety using Zod and TypeScript.
- **Secure by Design** - Row Level Security (RLS) ensures users only manage their own content.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Styling**: Tailwind CSS
- **Editor**: EasyMDE (Markdown)
- **Validation**: Zod & React Hook Form
- **Icons**: Lucide React

---

## 🏁 Getting Started & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Aman3899/aman-blogs.git
cd aman-blogs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## 🔗 Linking to Supabase

To fully link this project to your Supabase instance:

### 1. Database Schema
Run the following SQL in your Supabase **SQL Editor**:
The schema is provided in `supabase/schema.sql`. It sets up:
- `profiles` table (linked to `auth.users`)
- `blog_posts` table (with author foreign keys)
- RLS Policies for secure data access.

### 2. Authentication Configuration
- **Site URL**: Set to `http://localhost:3000` (or your production URL).
- **Redirect URIs**: Add `http://localhost:3000/auth/callback`.
- **Google Provider**: Enable and add your Google Client ID/Secret in the Supabase Auth Settings.

---

## 📖 Authentication Architecture

The project uses a hybrid authentication strategy:
- **Server-Side**: Middleware protects routes and handles session validation.
- **Client-Side**: Uses `@supabase/ssr` for seamless session management.
- **OAuth Callback**: A dedicated `/auth/callback` route handles the code exchange for social logins and magic links.

---

## 🧩 Bonus Features Explained

### 1. Optimistic UI Updates
When a user clicks "Publish", the UI immediately displays a "Publishing..." state with a preview of the post. This eliminates perceived latency and makes the application feel instantaneous.

### 2. Incremental Static Regeneration (ISR)
The blog pages are pre-rendered at build time but automatically updated in the background. We use a 60-second revalidation period:
```typescript
export const revalidate = 60;
```
This gives you the speed of static sites with the flexibility of dynamic ones.

### 3. Advanced Markdown Support
We don't just store text; we support full GFM (GitHub Flavored Markdown), including tables, syntax highlighting, and raw HTML sanitization.

---

## 🚢 Deployment

1. Push your code to GitHub.
2. Link your repository to **Vercel**.
3. Add your `.env.local` variables to the Vercel project settings.
4. Ensure your Supabase Auth Redirect URIs include your new Vercel domain.

---

## 👨‍💻 Developer & Submission

**Project Name**: Aman Blogs  
**Developer**: Aman  
**Assessment**: Next.js Full-Stack Developer  

**GitHub Sharing**: This repository has been shared with `@ahsang`.

---

## 📄 License
MIT © 2025 Aman Blogs.
