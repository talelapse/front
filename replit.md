# TaleLapse - Conversational Story Application

## Overview

TaleLapse is a full-stack web application that provides conversational story and guidance services in Korean. The application offers four types of conversations: traditional Korean Saju (사주팔자), Tarot, Astrology, and casual conversations. Users can engage in friendly conversational sessions and receive personalized insights based on their birth information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between client and server components:

**Frontend Architecture:**
- React-based SPA using TypeScript
- Vite for build tooling and development server
- Wouter for client-side routing
- TanStack Query for server state management
- Tailwind CSS with shadcn/ui components for styling

**Backend Architecture:**
- Express.js server with TypeScript
- RESTful API design with structured routes
- Drizzle ORM for database operations
- PostgreSQL database (via Neon serverless)
- Session-based authentication using OpenID Connect

**Development Environment:**
- Replit-optimized setup with development overlays
- Hot module replacement for fast development
- TypeScript compilation with strict mode

## Key Components

### Authentication System
- **Technology**: OpenID Connect with Replit Auth integration
- **Strategy**: Session-based authentication using express-session
- **Storage**: PostgreSQL session store with connect-pg-simple
- **Security**: HTTP-only cookies with secure flags in production

### Database Layer
- **ORM**: Drizzle with PostgreSQL dialect
- **Connection**: Neon serverless PostgreSQL with WebSocket support
- **Schema**: Organized in shared directory for type safety across client/server
- **Tables**: Users, user profiles, fortune sessions, messages, and results

### Fortune Telling Service
- **AI Integration**: OpenAI GPT-4o for generating fortune responses
- **Session Management**: Conversational state tracking with message history
- **Types**: Support for Saju, Tarot, and Astrology readings
- **Analysis**: Structured fortune results with scoring and recommendations

### User Interface
- **Design System**: shadcn/ui components with custom Korean fortune theme
- **Responsive**: Mobile-first design with appropriate breakpoints
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Internationalization**: Korean text content with appropriate fonts

## Data Flow

1. **User Registration/Login**: Replit OAuth flow → session creation → user profile setup
2. **Profile Setup**: Birth information collection → profile validation → completion flag
3. **Fortune Session**: Type selection → session creation → conversational AI interaction
4. **Results Generation**: Session completion → detailed analysis → structured results storage
5. **History Access**: Session retrieval → message display → result viewing

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **openai**: AI fortune generation
- **@tanstack/react-query**: Client-side data fetching
- **express**: Web server framework

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management

### Authentication
- **openid-client**: OIDC authentication
- **passport**: Authentication middleware
- **express-session**: Session management

## Deployment Strategy

**Development Environment:**
- Vite development server with HMR
- Express server with auto-reload via tsx
- Replit-specific development tooling and overlays

**Production Build:**
- Vite builds client assets to `dist/public`
- esbuild bundles server code to `dist/index.js`
- Static file serving from Express
- Environment-based configuration

**Database Management:**
- Drizzle migrations in `migrations/` directory
- Schema defined in `shared/schema.ts`
- Push-based deployment with `drizzle-kit push`

**Environment Configuration:**
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: AI service authentication
- `SESSION_SECRET`: Session encryption key
- `REPL_ID`: Replit environment identifier

The application is designed for deployment on Replit but can be adapted for other platforms with minimal configuration changes. The modular architecture allows for easy scaling and maintenance of individual components.

## Recent Changes

- **Enhanced landing page with complete content** - added comprehensive sections for service introduction, fortune types, and user reviews
- **Implemented smooth scrolling navigation** - landing page now includes functional anchor links between sections
- **Added detailed service explanations** - each fortune type now has expanded descriptions with specific features
- **Created realistic user testimonials** - authentic-feeling reviews showcasing different service types
- **Updated UI consistency** - "이야기" branding consistently applied across all components including landing page
- **Refined chat interface** - casual conversations show "이야기 친구" as title and "대화 완료" as completion button
- **Implemented storybook history feature** - added beautiful AI-generated story summaries for older conversations (24hr+)
- **Added demo data generation** - created comprehensive demo data system accessible through settings page
- **Emphasized TaleLapse core concept** - updated landing page to strongly highlight the "이야기 발자취" (story footprints) feature where conversations become beautiful storybook memories over time
- **Added dedicated TaleLapse section** - created new landing page section explaining how conversations are compressed into fairy tale-like summaries and preserved as personal story footprints