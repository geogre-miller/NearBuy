# SMTOWN Local Marketplace - Database Schema Documentation

## Overview
This database schema is designed for a local marketplace app serving Ngọc Hồi, Kon Tum - a community platform for buying, selling, and exchanging goods similar to Facebook Marketplace but localized.

## Database Tables

### 1. user_profiles
**Purpose**: Store user information and reputation data
**Relationships**: Links to auth.users (Supabase Auth)

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| user_id | UUID | Reference to auth.users | UNIQUE, NOT NULL |
| full_name | VARCHAR(100) | User's full name | NOT NULL |
| phone_number | VARCHAR(20) | Contact phone | UNIQUE |
| address | TEXT | Street address | |
| ward | VARCHAR(50) | Ward/commune (phường/xã) | |
| district | VARCHAR(50) | District | Default: 'Ngọc Hồi' |
| province | VARCHAR(50) | Province | Default: 'Kon Tum' |
| avatar_url | TEXT | Profile picture URL | |
| is_verified | BOOLEAN | Verification status | Default: FALSE |
| is_active | BOOLEAN | Account active status | Default: TRUE |
| rating | DECIMAL(2,1) | User rating (0-5) | Default: 0 |
| total_reviews | INTEGER | Number of reviews received | Default: 0 |
| total_sales | INTEGER | Number of successful sales | Default: 0 |
| bio | TEXT | User biography | |
| created_at | TIMESTAMPTZ | Account creation time | Default: NOW() |
| updated_at | TIMESTAMPTZ | Last update time | Default: NOW() |

### 2. categories
**Purpose**: Organize marketplace items into categories
**Relationships**: Referenced by posts table

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| name | VARCHAR(50) | Category name (English) | UNIQUE, NOT NULL |
| name_vietnamese | VARCHAR(50) | Category name (Vietnamese) | NOT NULL |
| description | TEXT | Category description | |
| icon_url | TEXT | Category icon URL | |
| is_active | BOOLEAN | Category active status | Default: TRUE |
| sort_order | INTEGER | Display order | Default: 0 |
| created_at | TIMESTAMPTZ | Creation time | Default: NOW() |

### 3. posts
**Purpose**: Main table for marketplace listings
**Relationships**: Links to user_profiles and categories

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| user_id | UUID | Post owner | FK to user_profiles.user_id |
| category_id | UUID | Item category | FK to categories.id |
| title | VARCHAR(200) | Post title | NOT NULL |
| description | TEXT | Item description | NOT NULL |
| price | DECIMAL(12,0) | Price in VND | |
| is_negotiable | BOOLEAN | Price negotiable | Default: TRUE |
| condition | VARCHAR(20) | Item condition | CHECK: new, like_new, good, fair, poor |
| post_type | VARCHAR(20) | Type of post | CHECK: sell, buy, exchange, service, free |
| status | VARCHAR(20) | Post status | CHECK: active, sold, hidden, expired |
| location_detail | TEXT | Specific location | |
| ward | VARCHAR(50) | Ward location | |
| latitude | DECIMAL(10,8) | GPS latitude | |
| longitude | DECIMAL(11,8) | GPS longitude | |
| contact_method | VARCHAR(20) | Preferred contact | CHECK: phone, message, both |
| view_count | INTEGER | Number of views | Default: 0 |
| is_featured | BOOLEAN | Featured post | Default: FALSE |
| expires_at | TIMESTAMPTZ | Post expiration | Default: NOW() + 30 days |
| created_at | TIMESTAMPTZ | Creation time | Default: NOW() |
| updated_at | TIMESTAMPTZ | Last update | Default: NOW() |

### 4. post_media
**Purpose**: Store images and videos for posts
**Relationships**: Links to posts table

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| post_id | UUID | Associated post | FK to posts.id |
| media_url | TEXT | Media file URL | NOT NULL |
| media_type | VARCHAR(10) | Type of media | CHECK: image, video |
| sort_order | INTEGER | Display order | Default: 0 |
| is_primary | BOOLEAN | Primary image | Default: FALSE |
| created_at | TIMESTAMPTZ | Upload time | Default: NOW() |

### 5. comments
**Purpose**: User comments on posts
**Relationships**: Links to posts and user_profiles

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| post_id | UUID | Associated post | FK to posts.id |
| user_id | UUID | Comment author | FK to user_profiles.user_id |
| parent_comment_id | UUID | Reply to comment | FK to comments.id |
| content | TEXT | Comment content | NOT NULL |
| is_deleted | BOOLEAN | Soft delete flag | Default: FALSE |
| created_at | TIMESTAMPTZ | Creation time | Default: NOW() |
| updated_at | TIMESTAMPTZ | Last edit time | Default: NOW() |

### 6. favorites
**Purpose**: User's saved/liked posts
**Relationships**: Links to posts and user_profiles

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| user_id | UUID | User who favorited | FK to user_profiles.user_id |
| post_id | UUID | Favorited post | FK to posts.id |
| created_at | TIMESTAMPTZ | Favorite time | Default: NOW() |
| | | | UNIQUE(user_id, post_id) |

### 7. reviews
**Purpose**: User ratings and reviews
**Relationships**: Links to user_profiles and posts

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| reviewer_id | UUID | User giving review | FK to user_profiles.user_id |
| reviewed_user_id | UUID | User being reviewed | FK to user_profiles.user_id |
| post_id | UUID | Related transaction | FK to posts.id |
| rating | INTEGER | Rating score (1-5) | CHECK: 1-5, NOT NULL |
| comment | TEXT | Review comment | |
| transaction_type | VARCHAR(20) | Type of transaction | CHECK: buy, sell, exchange, service |
| created_at | TIMESTAMPTZ | Review time | Default: NOW() |
| | | | UNIQUE(reviewer_id, reviewed_user_id, post_id) |

### 8. messages
**Purpose**: Direct messaging between users
**Relationships**: Links to user_profiles and posts

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| sender_id | UUID | Message sender | FK to user_profiles.user_id |
| receiver_id | UUID | Message recipient | FK to user_profiles.user_id |
| post_id | UUID | Related post | FK to posts.id |
| content | TEXT | Message content | NOT NULL |
| is_read | BOOLEAN | Read status | Default: FALSE |
| message_type | VARCHAR(20) | Message type | CHECK: text, image, offer |
| created_at | TIMESTAMPTZ | Send time | Default: NOW() |

### 9. conversations
**Purpose**: Organize messages into conversations
**Relationships**: Links to user_profiles and posts

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| id | UUID | Primary key | Default: uuid_generate_v4() |
| user1_id | UUID | First participant | FK to user_profiles.user_id |
| user2_id | UUID | Second participant | FK to user_profiles.user_id |
| post_id | UUID | Related post | FK to posts.id |
| last_message_at | TIMESTAMPTZ | Last activity | Default: NOW() |
| created_at | TIMESTAMPTZ | Conversation start | Default: NOW() |
| | | | UNIQUE(user1_id, user2_id, post_id) |

## Row Level Security (RLS) Summary

### Security Principles
1. **Public Browsing**: Anyone can view active posts and user profiles
2. **User Privacy**: Users control their own data
3. **Content Moderation**: Soft deletes for content management
4. **Communication Security**: Private messages only between participants

### Key RLS Policies
- **Posts**: Public read for active posts, owner control for management
- **User Profiles**: Public read for active profiles, self-management
- **Comments**: Public read on active posts, self-management
- **Messages**: Private between sender and receiver only
- **Reviews**: Public read, authenticated creation with validation

## Database Features

### Automatic Triggers
- **Updated Timestamps**: Auto-update `updated_at` columns
- **User Ratings**: Auto-calculate ratings from reviews
- **View Counting**: Track post view statistics

### Performance Indexes
- Location-based queries (ward, district)
- User-specific data (user_id foreign keys)
- Time-based queries (created_at, expires_at)
- Search optimization (status, category, price)

### Vietnamese Localization
- Vietnamese category names
- Local administrative divisions (ward/district)
- VND currency (no decimals)
- Local contact preferences

## Usage for Mobile Clients

### Common Query Patterns
1. **Browse Posts**: Filter by category, location, price range
2. **User Profile**: Get profile with ratings and review count
3. **Post Details**: Include media, comments, and owner info
4. **Search**: Text search with location and category filters
5. **Messaging**: Real-time conversation updates

### API Considerations
- Use Supabase realtime for live updates
- Implement pagination for large result sets
- Cache category data in mobile app
- Use image optimization for post media
- Implement offline favorites/drafts

## Future Enhancements
- Admin roles and content moderation
- Push notifications for messages
- Advanced search with full-text indexing
- Geofencing for ultra-local listings
- Business accounts for local shops
- Integration with local payment methods
