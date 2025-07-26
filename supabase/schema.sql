-- ===================================================================
-- SMTOWN LOCAL MARKETPLACE - SUPABASE SCHEMA
-- Location: Ngọc Hồi, Kon Tum
-- Purpose: Community marketplace for buying, selling, and exchanging goods
-- ===================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================================================
-- 1. USER PROFILES TABLE
-- ===================================================================
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    address TEXT,
    ward VARCHAR(50), -- phường/xã
    district VARCHAR(50) DEFAULT 'Ngọc Hồi',
    province VARCHAR(50) DEFAULT 'Kon Tum',
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    total_reviews INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- 2. CATEGORIES TABLE
-- ===================================================================
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    name_vietnamese VARCHAR(50) NOT NULL,
    description TEXT,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- 3. POSTS/LISTINGS TABLE
-- ===================================================================
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12,0), -- VND - no decimals needed
    is_negotiable BOOLEAN DEFAULT TRUE,
    condition VARCHAR(20) CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')) DEFAULT 'good',
    post_type VARCHAR(20) CHECK (post_type IN ('sell', 'buy', 'exchange', 'service', 'free')) NOT NULL DEFAULT 'sell',
    status VARCHAR(20) CHECK (status IN ('active', 'sold', 'hidden', 'expired')) DEFAULT 'active',
    location_detail TEXT, -- specific location within Ngọc Hồi
    ward VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_method VARCHAR(20) CHECK (contact_method IN ('phone', 'message', 'both')) DEFAULT 'both',
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- 4. POST MEDIA TABLE
-- ===================================================================
CREATE TABLE public.post_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
    media_url TEXT NOT NULL,
    media_type VARCHAR(10) CHECK (media_type IN ('image', 'video')) DEFAULT 'image',
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- 5. COMMENTS TABLE
-- ===================================================================
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- 6. FAVORITES/LIKES TABLE
-- ===================================================================
CREATE TABLE public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

-- ===================================================================
-- 7. REVIEWS TABLE
-- ===================================================================
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    reviewed_user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    transaction_type VARCHAR(20) CHECK (transaction_type IN ('buy', 'sell', 'exchange', 'service')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(reviewer_id, reviewed_user_id, post_id)
);

-- ===================================================================
-- 8. MESSAGES TABLE (for direct communication)
-- ===================================================================
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    message_type VARCHAR(20) CHECK (message_type IN ('text', 'image', 'offer')) DEFAULT 'text',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- 9. CONVERSATIONS TABLE (for organizing messages)
-- ===================================================================
CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    user2_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user1_id, user2_id, post_id)
);

-- ===================================================================
-- INDEXES FOR PERFORMANCE
-- ===================================================================

-- User profiles
CREATE INDEX idx_user_profiles_phone ON public.user_profiles(phone_number);
CREATE INDEX idx_user_profiles_location ON public.user_profiles(ward, district);

-- Posts
CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_category ON public.posts(category_id);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_type ON public.posts(post_type);
CREATE INDEX idx_posts_location ON public.posts(ward);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_price ON public.posts(price);
CREATE INDEX idx_posts_expires_at ON public.posts(expires_at);

-- Comments
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);

-- Favorites
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_post_id ON public.favorites(post_id);

-- Messages
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_messages_post ON public.messages(post_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);

-- ===================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ===================================================================

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Update user rating when new review is added
CREATE OR REPLACE FUNCTION public.update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.user_profiles 
    SET 
        rating = (
            SELECT ROUND(AVG(rating::numeric), 1) 
            FROM public.reviews 
            WHERE reviewed_user_id = NEW.reviewed_user_id
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM public.reviews 
            WHERE reviewed_user_id = NEW.reviewed_user_id
        )
    WHERE user_id = NEW.reviewed_user_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_rating_trigger AFTER INSERT ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.update_user_rating();

-- Update view count
CREATE OR REPLACE FUNCTION public.increment_view_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.posts 
    SET view_count = view_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
END;
$$ language 'plpgsql';
