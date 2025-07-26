# SMTOWN Marketplace - Complete Project Structure

## 📁 Root Directory Structure
```
smtown/
├── 📱 Frontend (Expo/React Native)
├── 🗄️ Backend (Supabase)
├── 📚 Documentation
├── 🔧 Configuration
└── 🚀 Deployment
```

## 📱 Frontend Structure (Expo/React Native)

```
smtown/
├── app.json                          # Expo configuration
├── package.json                      # Dependencies and scripts
├── package-lock.json                 # Lock file
├── expo-env.d.ts                     # Expo TypeScript definitions
├── tsconfig.json                     # TypeScript configuration
├── eslint.config.js                  # ESLint configuration
├── .env                              # Environment variables
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── metro.config.js                   # Metro bundler config
├── babel.config.js                   # Babel configuration
│
├── 📂 app/                           # App Router (Expo Router v3)
│   ├── _layout.tsx                   # Root layout with providers
│   ├── +not-found.tsx                # 404 page
│   ├── index.tsx                     # Landing/Welcome screen
│   │
│   ├── 📂 (auth)/                    # Authentication group
│   │   ├── _layout.tsx               # Auth layout
│   │   ├── login.tsx                 # Login screen
│   │   ├── register.tsx              # Registration screen
│   │   ├── forgot-password.tsx       # Password reset
│   │   └── verify-email.tsx          # Email verification
│   │
│   ├── 📂 (tabs)/                    # Main app tabs
│   │   ├── _layout.tsx               # Tab navigation layout
│   │   ├── index.tsx                 # Home/Browse posts
│   │   ├── search.tsx                # Search & filters
│   │   ├── favorites.tsx             # Saved posts
│   │   ├── messages.tsx              # Chat/Messages
│   │   ├── profile.tsx               # User profile
│   │   └── sell.tsx                  # Create new post
│   │
│   ├── 📂 post/                      # Post related screens
│   │   ├── [id].tsx                  # Post detail view
│   │   ├── edit/[id].tsx             # Edit post
│   │   └── create.tsx                # Create new post
│   │
│   ├── 📂 user/                      # User related screens
│   │   ├── [id].tsx                  # Other user profile
│   │   ├── edit-profile.tsx          # Edit own profile
│   │   ├── my-posts.tsx              # User's posts
│   │   └── reviews.tsx               # User reviews
│   │
│   ├── 📂 chat/                      # Messaging screens
│   │   ├── index.tsx                 # Conversations list
│   │   ├── [conversationId].tsx      # Chat screen
│   │   └── new.tsx                   # Start new conversation
│   │
│   └── 📂 settings/                  # Settings & preferences
│       ├── index.tsx                 # Settings menu
│       ├── notifications.tsx         # Notification settings
│       ├── privacy.tsx               # Privacy settings
│       └── about.tsx                 # About app
│
├── 📂 components/                    # Reusable UI components
│   ├── 📂 ui/                        # Base UI components
│   │   ├── Button.tsx                # Custom button
│   │   ├── Input.tsx                 # Text input
│   │   ├── Card.tsx                  # Card container
│   │   ├── Avatar.tsx                # User avatar
│   │   ├── Badge.tsx                 # Status badges
│   │   ├── Loading.tsx               # Loading indicators
│   │   ├── Modal.tsx                 # Modal dialog
│   │   ├── Toast.tsx                 # Toast notifications
│   │   ├── ImagePicker.tsx           # Image selection
│   │   ├── LocationPicker.tsx        # Location selection
│   │   └── index.ts                  # Export all UI components
│   │
│   ├── 📂 forms/                     # Form components
│   │   ├── AuthForm.tsx              # Login/register forms
│   │   ├── PostForm.tsx              # Create/edit post form
│   │   ├── ProfileForm.tsx           # Profile edit form
│   │   ├── ReviewForm.tsx            # Review submission form
│   │   └── SearchForm.tsx            # Search filters form
│   │
│   ├── 📂 lists/                     # List components
│   │   ├── PostList.tsx              # Posts grid/list
│   │   ├── PostCard.tsx              # Individual post card
│   │   ├── UserList.tsx              # User listings
│   │   ├── ConversationList.tsx      # Chat conversations
│   │   ├── MessageBubble.tsx         # Chat message
│   │   └── ReviewList.tsx            # User reviews
│   │
│   ├── 📂 navigation/                # Navigation components
│   │   ├── TabBarIcon.tsx            # Tab bar icons
│   │   ├── BackButton.tsx            # Back navigation
│   │   └── HeaderActions.tsx         # Header buttons
│   │
│   └── 📂 common/                    # Common components
│       ├── EmptyState.tsx            # Empty list states
│       ├── ErrorBoundary.tsx         # Error handling
│       ├── ImageViewer.tsx           # Full screen image
│       ├── LocationDisplay.tsx       # Show location info
│       ├── PriceDisplay.tsx          # Format VND prices
│       ├── RatingStars.tsx           # Star ratings
│       └── TimeAgo.tsx               # Relative time display
│
├── 📂 lib/                           # Core utilities and services
│   ├── 📂 supabase/                  # Supabase client and helpers
│   │   ├── client.ts                 # Supabase client setup
│   │   ├── auth.ts                   # Authentication helpers
│   │   ├── database.ts               # Database operations
│   │   ├── storage.ts                # File upload/download
│   │   ├── realtime.ts               # Real-time subscriptions
│   │   └── types.ts                  # Database types
│   │
│   ├── 📂 api/                       # API layer
│   │   ├── posts.ts                  # Post operations
│   │   ├── users.ts                  # User operations
│   │   ├── messages.ts               # Messaging operations
│   │   ├── reviews.ts                # Review operations
│   │   ├── categories.ts             # Category operations
│   │   └── favorites.ts              # Favorites operations
│   │
│   ├── 📂 hooks/                     # Custom React hooks
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── usePosts.ts               # Posts data hook
│   │   ├── useMessages.ts            # Messages hook
│   │   ├── useLocation.ts            # Location services
│   │   ├── useImagePicker.ts         # Image selection hook
│   │   ├── useNotifications.ts       # Push notifications
│   │   └── useOfflineQueue.ts        # Offline operations
│   │
│   ├── 📂 utils/                     # Utility functions
│   │   ├── validation.ts             # Form validation
│   │   ├── formatting.ts             # Text/number formatting
│   │   ├── datetime.ts               # Date/time utilities
│   │   ├── permissions.ts            # Device permissions
│   │   ├── constants.ts              # App constants
│   │   ├── storage.ts                # Local storage helpers
│   │   └── navigation.ts             # Navigation helpers
│   │
│   └── 📂 context/                   # React Context providers
│       ├── AuthContext.tsx           # Authentication state
│       ├── ThemeContext.tsx          # Theme/dark mode
│       ├── LocationContext.tsx       # User location
│       └── NotificationContext.tsx   # Notifications state
│
├── 📂 assets/                        # Static assets
│   ├── 📂 images/                    # Image assets
│   │   ├── logo.png                  # App logo
│   │   ├── placeholder.png           # Image placeholders
│   │   ├── onboarding/              # Onboarding images
│   │   └── categories/              # Category icons
│   │
│   ├── 📂 fonts/                     # Custom fonts
│   │   ├── Roboto-Regular.ttf        # Primary font
│   │   └── Roboto-Bold.ttf           # Bold variant
│   │
│   └── 📂 icons/                     # Icon assets
│       ├── app-icon.png              # App icon
│       ├── adaptive-icon.png         # Android adaptive
│       └── splash-icon.png           # Splash screen
│
├── 📂 constants/                     # App constants
│   ├── Colors.ts                     # Color palette
│   ├── Fonts.ts                      # Typography
│   ├── Layout.ts                     # Layout constants
│   ├── Categories.ts                 # Category definitions
│   └── Config.ts                     # App configuration
│
└── 📂 types/                         # TypeScript type definitions
    ├── auth.ts                       # Authentication types
    ├── post.ts                       # Post related types
    ├── user.ts                       # User types
    ├── message.ts                    # Messaging types
    ├── navigation.ts                 # Navigation types
    └── api.ts                        # API response types
```

## 🗄️ Backend Structure (Supabase)

```
smtown/
├── 📂 supabase/                      # Supabase backend
│   ├── 📂 migrations/                # Database migrations
│   │   ├── 20250726000001_initial_schema.sql
│   │   ├── 20250726000002_rls_policies.sql
│   │   ├── 20250726000003_sample_data.sql
│   │   └── 20250726000004_functions.sql
│   │
│   ├── 📂 functions/                 # Edge functions
│   │   ├── 📂 send-notification/     # Push notifications
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   │
│   │   ├── 📂 image-resize/          # Image processing
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   │
│   │   └── 📂 content-moderation/    # Content filtering
│   │       ├── index.ts
│   │       └── deno.json
│   │
│   ├── 📂 policies/                  # RLS policies organized
│   │   ├── user_profiles.sql
│   │   ├── posts.sql
│   │   ├── messages.sql
│   │   └── reviews.sql
│   │
│   ├── 📂 storage/                   # Storage bucket configs
│   │   ├── marketplace-media.sql     # Media bucket setup
│   │   └── avatars.sql               # Avatar bucket setup
│   │
│   ├── config.toml                   # Supabase config
│   ├── seed.sql                      # Seed data
│   └── types.ts                      # Generated types
```

## 📚 Documentation

```
smtown/
├── 📂 docs/                          # Project documentation
│   ├── 📂 api/                       # API documentation
│   │   ├── authentication.md
│   │   ├── posts.md
│   │   ├── users.md
│   │   └── messages.md
│   │
│   ├── 📂 deployment/                # Deployment guides
│   │   ├── expo-build.md
│   │   ├── app-store.md
│   │   ├── play-store.md
│   │   └── supabase-setup.md
│   │
│   ├── 📂 design/                    # Design documents
│   │   ├── ui-guidelines.md
│   │   ├── user-flows.md
│   │   └── color-scheme.md
│   │
│   └── 📂 development/               # Development guides
│       ├── getting-started.md
│       ├── coding-standards.md
│       ├── testing.md
│       └── troubleshooting.md
```

## 🔧 Configuration Files

```
smtown/
├── .env                              # Environment variables
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── .eslintrc.js                      # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── app.json                          # Expo configuration
├── eas.json                          # EAS Build configuration
├── metro.config.js                   # Metro bundler config
├── babel.config.js                   # Babel configuration
├── tsconfig.json                     # TypeScript config
└── jest.config.js                    # Jest testing config
```

## 🚀 Deployment & CI/CD

```
smtown/
├── 📂 .github/                       # GitHub Actions
│   └── 📂 workflows/
│       ├── test.yml                  # Run tests
│       ├── build-android.yml         # Android build
│       ├── build-ios.yml             # iOS build
│       └── deploy-preview.yml        # Preview builds
│
├── 📂 scripts/                       # Build scripts
│   ├── prebuild.js                   # Pre-build setup
│   ├── postbuild.js                  # Post-build tasks
│   ├── generate-types.js             # Generate Supabase types
│   └── upload-source-maps.js         # Error tracking setup
│
└── 📂 patches/                       # Package patches
    └── react-native+0.73.2.patch    # RN patches if needed
```

## 📦 Key Dependencies Structure

### Frontend Dependencies
```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.4.0",
    "@supabase/supabase-js": "^2.38.0",
    "react-native-reanimated": "~3.6.0",
    "expo-image-picker": "~14.7.0",
    "expo-location": "~16.5.0",
    "expo-notifications": "~0.27.0",
    "@react-native-async-storage/async-storage": "1.21.0"
  },
  "devDependencies": {
    "@types/react": "~18.2.45",
    "typescript": "^5.1.3",
    "eslint": "^8.57.0",
    "prettier": "^3.2.0",
    "jest": "^29.4.0"
  }
}
```

## 🏗️ Development Workflow

### 1. Environment Setup
```bash
# Clone and setup
git clone <repository>
cd smtown
npm install

# Setup environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Generate types
npm run generate-types
```

### 2. Development Commands
```bash
# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test
npm run test:watch
```

### 3. Build & Deploy
```bash
# Preview builds
eas build --platform all --profile preview

# Production builds
eas build --platform all --profile production

# Submit to stores
eas submit --platform all
```

## 📋 Feature Implementation Checklist

### Phase 1: Core Features
- [ ] User authentication (login/register)
- [ ] User profile management
- [ ] Post creation and browsing
- [ ] Basic search and filters
- [ ] Image upload and management

### Phase 2: Social Features
- [ ] Direct messaging
- [ ] User reviews and ratings
- [ ] Favorites/bookmarks
- [ ] Post comments
- [ ] Real-time notifications

### Phase 3: Advanced Features
- [ ] Location-based search
- [ ] Push notifications
- [ ] Offline support
- [ ] Advanced analytics
- [ ] Content moderation

### Phase 4: Business Features
- [ ] Featured posts
- [ ] Business accounts
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Reporting system

This structure provides a solid foundation for your SMTOWN marketplace app with clear separation of concerns, scalability, and maintainability in mind.
