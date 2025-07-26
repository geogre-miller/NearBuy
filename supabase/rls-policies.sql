-- ===================================================================
-- ROW LEVEL SECURITY (RLS) SETUP
-- SMTOWN LOCAL MARKETPLACE
-- ===================================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- ===================================================================
-- USER PROFILES POLICIES
-- ===================================================================

-- Anyone can view active user profiles (for marketplace browsing)
CREATE POLICY "Public profiles are viewable by everyone" ON public.user_profiles
    FOR SELECT USING (is_active = true);

-- Users can view their own profile (including inactive)
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Users cannot delete profiles (soft delete via is_active)
-- Admin can manage all profiles (implement admin role later if needed)

-- ===================================================================
-- CATEGORIES POLICIES  
-- ===================================================================

-- Everyone can view active categories
CREATE POLICY "Active categories are viewable by everyone" ON public.categories
    FOR SELECT USING (is_active = true);

-- Only authenticated users can suggest categories (for future feature)
-- Admins can manage categories (implement admin role later)

-- ===================================================================
-- POSTS POLICIES
-- ===================================================================

-- Anyone can view active posts
CREATE POLICY "Active posts are viewable by everyone" ON public.posts
    FOR SELECT USING (status = 'active');

-- Users can view their own posts regardless of status
CREATE POLICY "Users can view own posts" ON public.posts
    FOR SELECT USING (auth.uid() = user_id);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" ON public.posts
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND 
        auth.uid() IS NOT NULL
    );

-- Users can update their own posts
CREATE POLICY "Users can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts" ON public.posts
    FOR DELETE USING (auth.uid() = user_id);

-- ===================================================================
-- POST MEDIA POLICIES
-- ===================================================================

-- Anyone can view media for active posts
CREATE POLICY "Media for active posts viewable by everyone" ON public.post_media
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = post_media.post_id 
            AND posts.status = 'active'
        )
    );

-- Users can view media for their own posts
CREATE POLICY "Users can view own post media" ON public.post_media
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = post_media.post_id 
            AND posts.user_id = auth.uid()
        )
    );

-- Users can add media to their own posts
CREATE POLICY "Users can add media to own posts" ON public.post_media
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = post_media.post_id 
            AND posts.user_id = auth.uid()
        )
    );

-- Users can update/delete media from their own posts
CREATE POLICY "Users can manage own post media" ON public.post_media
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = post_media.post_id 
            AND posts.user_id = auth.uid()
        )
    );

-- ===================================================================
-- COMMENTS POLICIES
-- ===================================================================

-- Anyone can view comments on active posts
CREATE POLICY "Comments on active posts viewable by everyone" ON public.comments
    FOR SELECT USING (
        NOT is_deleted AND
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = comments.post_id 
            AND posts.status = 'active'
        )
    );

-- Users can view their own comments
CREATE POLICY "Users can view own comments" ON public.comments
    FOR SELECT USING (auth.uid() = user_id);

-- Authenticated users can create comments on active posts
CREATE POLICY "Users can comment on active posts" ON public.comments
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        auth.uid() IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = comments.post_id 
            AND posts.status = 'active'
        )
    );

-- Users can update their own comments
CREATE POLICY "Users can update own comments" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can soft-delete their own comments
CREATE POLICY "Users can delete own comments" ON public.comments
    FOR DELETE USING (auth.uid() = user_id);

-- ===================================================================
-- FAVORITES POLICIES
-- ===================================================================

-- Users can view their own favorites
CREATE POLICY "Users can view own favorites" ON public.favorites
    FOR SELECT USING (auth.uid() = user_id);

-- Users can add favorites
CREATE POLICY "Users can add favorites" ON public.favorites
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        auth.uid() IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = favorites.post_id 
            AND posts.status = 'active'
        )
    );

-- Users can remove their own favorites
CREATE POLICY "Users can remove own favorites" ON public.favorites
    FOR DELETE USING (auth.uid() = user_id);

-- ===================================================================
-- REVIEWS POLICIES
-- ===================================================================

-- Everyone can view reviews for active users
CREATE POLICY "Reviews for active users viewable by everyone" ON public.reviews
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE user_profiles.user_id = reviews.reviewed_user_id 
            AND user_profiles.is_active = true
        )
    );

-- Authenticated users can create reviews
CREATE POLICY "Users can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (
        auth.uid() = reviewer_id AND
        auth.uid() IS NOT NULL AND
        reviewer_id != reviewed_user_id  -- Can't review yourself
    );

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON public.reviews
    FOR UPDATE USING (auth.uid() = reviewer_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON public.reviews
    FOR DELETE USING (auth.uid() = reviewer_id);

-- ===================================================================
-- MESSAGES POLICIES
-- ===================================================================

-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages" ON public.messages
    FOR SELECT USING (
        auth.uid() = sender_id OR 
        auth.uid() = receiver_id
    );

-- Users can send messages
CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        auth.uid() IS NOT NULL AND
        sender_id != receiver_id  -- Can't message yourself
    );

-- Users can update messages they sent (for editing)
CREATE POLICY "Users can update own sent messages" ON public.messages
    FOR UPDATE USING (auth.uid() = sender_id);

-- Users can delete messages they sent
CREATE POLICY "Users can delete own sent messages" ON public.messages
    FOR DELETE USING (auth.uid() = sender_id);

-- ===================================================================
-- CONVERSATIONS POLICIES
-- ===================================================================

-- Users can view conversations they are part of
CREATE POLICY "Users can view own conversations" ON public.conversations
    FOR SELECT USING (
        auth.uid() = user1_id OR 
        auth.uid() = user2_id
    );

-- Users can create conversations
CREATE POLICY "Users can create conversations" ON public.conversations
    FOR INSERT WITH CHECK (
        (auth.uid() = user1_id OR auth.uid() = user2_id) AND
        auth.uid() IS NOT NULL AND
        user1_id != user2_id  -- Can't converse with yourself
    );

-- Users can update conversations they are part of
CREATE POLICY "Users can update own conversations" ON public.conversations
    FOR UPDATE USING (
        auth.uid() = user1_id OR 
        auth.uid() = user2_id
    );

-- ===================================================================
-- SECURITY FUNCTIONS
-- ===================================================================

-- Function to check if user is admin (for future use)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Implement admin check logic here
    -- For now, return false (no admins)
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user owns a post
CREATE OR REPLACE FUNCTION public.user_owns_post(post_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.posts 
        WHERE id = post_id AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
