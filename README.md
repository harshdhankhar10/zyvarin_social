# Zyvarin Social - Multi-Platform Social Media Scheduler

A comprehensive web application for scheduling, composing, and publishing content across multiple social media platforms with intelligent AI-powered suggestions and analytics.

## Overview

Zyvarin Social streamlines social media content management by providing a unified dashboard for scheduling posts across LinkedIn, Twitter, and Dev.to. With built-in AI suggestions, real-time preview, and automated publishing, teams and creators can maintain consistent social presence without manual intervention.

## Key Features

### 📝 Smart Content Composition
- **Rich Post Editor** - Compose content with real-time preview
- **Multi-Platform Support** - Post to LinkedIn, Twitter, and Dev.to simultaneously
- **Media Uploads** - Attach images to enhance posts
- **Draft Saving** - save drafts to localStorage

### 🤖 AI-Powered Assistance
- **AI Suggestions Modal** - Generate platform-specific post variations
- **Content Optimization** - Intelligent suggestions for better engagement
- **Loading States** - Beautiful skeleton loaders while generating suggestions

### 📅 Advanced Scheduling
- **Flexible Scheduling** - Schedule posts for future dates and times
- **Instant Publishing** - Publish immediately or schedule for later
- **Multi-Platform Scheduling** - Schedule to multiple platforms in one action
- **Calendar View** - Visual representation of scheduled posts

### ⏰ Automated Publishing
- **Cron Jobs** - Automatic post publishing every hour at scheduled times
- **Real-time Status Updates** - Posts automatically transition from SCHEDULED to POSTED
- **Error Handling** - Graceful failure management with user notifications
- **Hourly Execution** - Runs at 9:00, 10:00, 11:00, etc. (configurable)

### 🔔 User Notifications
- **Success Alerts** - Instant notifications when posts publish successfully
- **Error Notifications** - Detailed error messages if publishing fails
- **In-App Notifications** - Real-time updates without leaving the platform
- **System Messages** - Timestamped logs of all publishing activities

### 📊 User Dashboard
- **Analytics Overview** - Track post performance and engagement metrics
- **Connected Accounts** - Manage connected social media profiles
- **Billing Management** - View invoices and subscription details
- **Account Settings** - Profile, security, and workspace configuration

### 🔐 Security & Authentication
- **NextAuth Integration** - Secure authentication with session management
- **OAuth2 Connections** - Secure API integrations with social platforms
- **Token Refresh** - Automatic token refresh for expired credentials
- **Cron Verification** - Bearer token authentication for cron jobs

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Lucide Icons** - Beautiful icon library
- **React Hooks** - Modern state management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Robust relational database
- **NextAuth.js** - Authentication & authorization

### Platform Integrations
- **LinkedIn API v2** - ugcPosts endpoint for content publishing
- **Twitter API v2** - Tweet posting and media management
- **Dev.to API** - Article publishing platform
- **Vercel Cron Jobs** - Scheduled task execution

## Project Structure

```
zyvarin_social/
├── app/
│   ├── api/
│   │   ├── auth/              # Authentication endpoints
│   │   ├── social/            # Platform-specific API routes
│   │   │   ├── linkedin/
│   │   │   ├── twitter/
│   │   │   └── dev_to/
│   │   ├── upload/            # Media upload handling
│   │   ├── dashboard/         # Billing & dashboard API
│   │   └── cron/              # Scheduled post publishing
│   ├── (auth)/                # Authentication pages
│   ├── dashboard/             # Main dashboard
│   └── api/                   # Global API configuration
├── components/
│   ├── Dashboard/             # Dashboard components
│   │   ├── Compose Post/      # Post composition UI
│   │   ├── Settings/          # Settings management
│   │   └── Analytics.tsx      # Analytics display
│   ├── Global/                # Reusable components
│   └── ui/                    # shadcn/ui components
├── utils/
│   ├── publishPost.ts         # Core publishing logic
│   ├── auth.ts                # Authentication utilities
│   └── socialUtils.ts         # Platform-specific helpers
├── lib/
│   ├── prisma.ts              # Prisma client
│   └── utils.ts               # Helper utilities
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Social platform API credentials
  - LinkedIn App ID & Secret
  - Twitter API keys & tokens
  - Dev.to API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshdhankhar10/zyvarin_social.git
   cd zyvarin_social
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your credentials:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/zyvarin
   
   # NextAuth
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   
   # LinkedIn
   LINKEDIN_CLIENT_ID=your_linkedin_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_secret
   
   # Twitter/X
   X_CLIENT_ID=your_twitter_id
   X_CLIENT_SECRET=your_twitter_secret
   
   # Dev.to
   DEVTO_API_KEY=your_devto_key
   
   # Cron
   CRON_SECRET=your_secure_cron_secret
   
   # Base URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your app.

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: Deploy Zyvarin Social"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Enable Cron Jobs**
   - Configure `vercel.json` with cron schedule
   - Current: `0 * * * *` (every hour)
   - Cron endpoint: `/api/cron`

## Usage

### Creating and Scheduling Posts

1. **Navigate to Compose** - Go to dashboard compose section
2. **Write Content** - Enter your post content (respects platform limits)
3. **Add Media** - Upload images for visual engagement
4. **Get AI Suggestions** - Click "Get AI Suggestions" for platform-specific variations
5. **Choose Platforms** - Select LinkedIn, Twitter, Dev.to, or combination
6. **Schedule or Publish**
   - **Immediate**: Click "Publish Now" for instant posting
   - **Scheduled**: Click "Schedule Post" and pick date/time
7. **View Calendar** - Monitor all scheduled posts in the calendar view

### Managing Scheduled Posts

- **Calendar View** - See all posts scheduled across platforms
- **Status Tracking** - Follow post status from SCHEDULED → POSTED
- **Notifications** - Receive alerts on publish success/failure

### Social Account Management

1. **Connect Accounts** - Go to Settings → Integrations
2. **Authorize Platforms** - Click platform buttons to authenticate
3. **Manage Connections** - View connected accounts and token status
4. **Disconnect** - Remove platform access when needed

## Database Schema

### Key Models

**User**
- Authentication and profile information
- Email verification status
- Subscription tier

**Post**
- Content and media storage
- Scheduling metadata
- Publishing status and timestamps
- Error messages for failed posts

**SocialProvider**
- Connected platform credentials
- Access tokens and refresh tokens
- Token expiration tracking
- Connection status

**Notification**
- User alerts and system messages
- Read status tracking
- Timestamped delivery

## API Endpoints

### Social Posting
- `POST /api/social/linkedin/post` - LinkedIn posting
- `POST /api/social/twitter/post` - Twitter posting
- `POST /api/social/dev_to/post` - Dev.to posting

### Scheduling
- `POST /api/dashboard/billing/buy` - Purchase subscription
- `POST /api/dashboard/billing/verify` - Verify payment

### Automation
- `GET /api/cron` - Scheduled post publishing (hourly)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset

## Performance Optimization

- **Server-Side Rendering** - Fast initial page loads
- **Image Optimization** - Automatic image compression
- **Code Splitting** - Lazy loading of components
- **Caching Strategy** - Optimized API response caching
- **Database Indexing** - Indexed queries for faster retrieval

## Security Features

- **Environment Variables** - Sensitive data protection
- **OAuth2** - Secure platform authentication
- **HTTPS Only** - Encrypted data transmission
- **CSRF Protection** - Request validation
- **Rate Limiting** - API abuse prevention
- **Token Expiration** - Automatic credential refresh

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Analytics Dashboard with engagement metrics
- [ ] Content calendar with drag-and-drop scheduling
- [ ] Team collaboration features
- [ ] Additional platform integrations (Instagram, Facebook)
- [ ] AI-powered hashtag suggestions
- [ ] Audience insights and best time to post
- [ ] Post templates and presets

## Known Limitations

- LinkedIn posts limited to 3000 characters
- Twitter posts limited to 280 characters
- Image uploads limited to 10MB per file
- Cron jobs run every hour (UTC)
- Maximum 5 scheduled posts per day per user

## Support & Contact

For issues, feature requests, or support:
- **Email** - support@zyvarin.social
- **GitHub Issues** - [Report Bug](https://github.com/harshdhankhar10/zyvarin_social/issues)
- **Documentation** - [Full Docs](https://docs.zyvarin.social)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Database ORM by [Prisma](https://prisma.io)
- Authentication via [NextAuth.js](https://next-auth.js.org)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

**Version:** 1.0.0  
**Last Updated:** December 8, 2025  
**Maintainer:** Harsh Dhankhar
