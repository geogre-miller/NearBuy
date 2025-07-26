-- ===================================================================
-- USEFUL QUERIES FOR SMTOWN MARKETPLACE
-- Common queries that mobile clients will need
-- ===================================================================

-- ===================================================================
-- 1. BROWSE POSTS (Homepage Feed)
-- ===================================================================

-- Get active posts with user info and media (paginated)
SELECT 
    p.id,
    p.title,
    p.description,
    p.price,
    p.is_negotiable,
    p.condition,
    p.post_type,
    p.location_detail,
    p.ward,
    p.view_count,
    p.created_at,
    
    -- User info
    up.full_name as seller_name,
    up.avatar_url as seller_avatar,
    up.rating as seller_rating,
    up.total_sales,
    
    -- Category info
    c.name as category_name,
    c.name_vietnamese as category_vietnamese,
    
    -- Primary image
    (
        SELECT pm.media_url 
        FROM public.post_media pm 
        WHERE pm.post_id = p.id 
        AND pm.is_primary = true 
        LIMIT 1
    ) as primary_image,
    
    -- Image count
    (
        SELECT COUNT(*) 
        FROM public.post_media pm 
        WHERE pm.post_id = p.id
    ) as image_count

FROM public.posts p
LEFT JOIN public.user_profiles up ON p.user_id = up.user_id
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE p.status = 'active'
ORDER BY p.created_at DESC
LIMIT 20 OFFSET 0;

-- ===================================================================
-- 2. SEARCH POSTS WITH FILTERS
-- ===================================================================

-- Search with category, price range, and location filters
SELECT 
    p.*,
    up.full_name as seller_name,
    up.rating as seller_rating,
    c.name_vietnamese as category_name
FROM public.posts p
LEFT JOIN public.user_profiles up ON p.user_id = up.user_id
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE p.status = 'active'
    AND (p.title ILIKE '%điện thoại%' OR p.description ILIKE '%điện thoại%')  -- Search term
    AND p.category_id = 'electronics-category-uuid'  -- Category filter
    AND p.price BETWEEN 1000000 AND 20000000  -- Price range
    AND p.ward = 'Phường Quyết Thắng'  -- Location filter
ORDER BY p.created_at DESC;

-- ===================================================================
-- 3. GET SINGLE POST DETAILS
-- ===================================================================

-- Complete post details with all related data
SELECT 
    p.*,
    
    -- Seller info
    up.full_name as seller_name,
    up.phone_number as seller_phone,
    up.avatar_url as seller_avatar,
    up.rating as seller_rating,
    up.total_reviews,
    up.total_sales,
    up.bio as seller_bio,
    up.created_at as seller_joined,
    
    -- Category
    c.name_vietnamese as category_name,
    
    -- Media URLs (as JSON array)
    COALESCE(
        (
            SELECT json_agg(
                json_build_object(
                    'url', pm.media_url,
                    'type', pm.media_type,
                    'is_primary', pm.is_primary
                ) ORDER BY pm.sort_order
            )
            FROM public.post_media pm 
            WHERE pm.post_id = p.id
        ),
        '[]'::json
    ) as media,
    
    -- Is favorited by current user
    EXISTS(
        SELECT 1 FROM public.favorites f 
        WHERE f.post_id = p.id 
        AND f.user_id = auth.uid()
    ) as is_favorited

FROM public.posts p
LEFT JOIN public.user_profiles up ON p.user_id = up.user_id
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE p.id = 'post-uuid-here'
    AND (p.status = 'active' OR p.user_id = auth.uid());

-- ===================================================================
-- 4. GET USER'S OWN POSTS
-- ===================================================================

-- User's posts with status summary
SELECT 
    p.*,
    c.name_vietnamese as category_name,
    (
        SELECT pm.media_url 
        FROM public.post_media pm 
        WHERE pm.post_id = p.id 
        AND pm.is_primary = true 
        LIMIT 1
    ) as primary_image,
    (
        SELECT COUNT(*) 
        FROM public.comments co 
        WHERE co.post_id = p.id 
        AND co.is_deleted = false
    ) as comment_count,
    (
        SELECT COUNT(*) 
        FROM public.favorites f 
        WHERE f.post_id = p.id
    ) as favorite_count

FROM public.posts p
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE p.user_id = auth.uid()
ORDER BY p.created_at DESC;

-- ===================================================================
-- 5. GET USER'S FAVORITES
-- ===================================================================

-- User's favorited posts
SELECT 
    p.*,
    up.full_name as seller_name,
    up.rating as seller_rating,
    c.name_vietnamese as category_name,
    f.created_at as favorited_at,
    (
        SELECT pm.media_url 
        FROM public.post_media pm 
        WHERE pm.post_id = p.id 
        AND pm.is_primary = true 
        LIMIT 1
    ) as primary_image

FROM public.favorites f
JOIN public.posts p ON f.post_id = p.id
LEFT JOIN public.user_profiles up ON p.user_id = up.user_id
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE f.user_id = auth.uid()
    AND p.status = 'active'
ORDER BY f.created_at DESC;

-- ===================================================================
-- 6. GET COMMENTS FOR A POST
-- ===================================================================

-- Comments with user info and replies
WITH RECURSIVE comment_tree AS (
    -- Parent comments
    SELECT 
        c.*,
        up.full_name as author_name,
        up.avatar_url as author_avatar,
        0 as level
    FROM public.comments c
    LEFT JOIN public.user_profiles up ON c.user_id = up.user_id
    WHERE c.post_id = 'post-uuid-here'
        AND c.parent_comment_id IS NULL
        AND c.is_deleted = false
    
    UNION ALL
    
    -- Reply comments
    SELECT 
        c.*,
        up.full_name as author_name,
        up.avatar_url as author_avatar,
        ct.level + 1
    FROM public.comments c
    LEFT JOIN public.user_profiles up ON c.user_id = up.user_id
    JOIN comment_tree ct ON c.parent_comment_id = ct.id
    WHERE c.is_deleted = false
)
SELECT * FROM comment_tree
ORDER BY level, created_at ASC;

-- ===================================================================
-- 7. GET USER CONVERSATIONS
-- ===================================================================

-- User's conversations with last message info
SELECT 
    conv.*,
    
    -- Other user info
    CASE 
        WHEN conv.user1_id = auth.uid() THEN up2.full_name
        ELSE up1.full_name
    END as other_user_name,
    
    CASE 
        WHEN conv.user1_id = auth.uid() THEN up2.avatar_url
        ELSE up1.avatar_url
    END as other_user_avatar,
    
    CASE 
        WHEN conv.user1_id = auth.uid() THEN conv.user2_id
        ELSE conv.user1_id
    END as other_user_id,
    
    -- Related post info
    p.title as post_title,
    p.price as post_price,
    
    -- Last message
    (
        SELECT m.content 
        FROM public.messages m 
        WHERE (m.sender_id = conv.user1_id AND m.receiver_id = conv.user2_id)
           OR (m.sender_id = conv.user2_id AND m.receiver_id = conv.user1_id)
        ORDER BY m.created_at DESC 
        LIMIT 1
    ) as last_message,
    
    -- Unread count for current user
    (
        SELECT COUNT(*) 
        FROM public.messages m 
        WHERE m.receiver_id = auth.uid()
            AND m.is_read = false
            AND ((m.sender_id = conv.user1_id AND conv.user1_id != auth.uid()) 
                 OR (m.sender_id = conv.user2_id AND conv.user2_id != auth.uid()))
    ) as unread_count

FROM public.conversations conv
LEFT JOIN public.user_profiles up1 ON conv.user1_id = up1.user_id
LEFT JOIN public.user_profiles up2 ON conv.user2_id = up2.user_id
LEFT JOIN public.posts p ON conv.post_id = p.id
WHERE conv.user1_id = auth.uid() OR conv.user2_id = auth.uid()
ORDER BY conv.last_message_at DESC;

-- ===================================================================
-- 8. GET MESSAGES IN A CONVERSATION
-- ===================================================================

-- Messages between two users about a specific post
SELECT 
    m.*,
    up.full_name as sender_name,
    up.avatar_url as sender_avatar
FROM public.messages m
LEFT JOIN public.user_profiles up ON m.sender_id = up.user_id
WHERE ((m.sender_id = 'user1-uuid' AND m.receiver_id = 'user2-uuid')
    OR (m.sender_id = 'user2-uuid' AND m.receiver_id = 'user1-uuid'))
    AND m.post_id = 'post-uuid-here'
ORDER BY m.created_at ASC;

-- ===================================================================
-- 9. ANALYTICS QUERIES (for user dashboard)
-- ===================================================================

-- User's selling statistics
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_posts,
    COUNT(CASE WHEN status = 'sold' THEN 1 END) as sold_posts,
    SUM(view_count) as total_views,
    AVG(view_count) as avg_views_per_post,
    
    -- This month's activity
    COUNT(CASE WHEN created_at >= DATE_TRUNC('month', NOW()) THEN 1 END) as posts_this_month
    
FROM public.posts
WHERE user_id = auth.uid();

-- ===================================================================
-- 10. TRENDING/POPULAR POSTS
-- ===================================================================

-- Most viewed posts in the last week
SELECT 
    p.*,
    up.full_name as seller_name,
    c.name_vietnamese as category_name,
    (
        SELECT pm.media_url 
        FROM public.post_media pm 
        WHERE pm.post_id = p.id 
        AND pm.is_primary = true 
        LIMIT 1
    ) as primary_image
    
FROM public.posts p
LEFT JOIN public.user_profiles up ON p.user_id = up.user_id
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE p.status = 'active'
    AND p.created_at >= NOW() - INTERVAL '7 days'
ORDER BY p.view_count DESC, p.created_at DESC
LIMIT 10;

-- ===================================================================
-- HELPER FUNCTIONS FOR MOBILE CLIENTS
-- ===================================================================

-- Function to mark post as viewed (increment view count)
CREATE OR REPLACE FUNCTION public.increment_post_views(post_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.posts 
    SET view_count = view_count + 1 
    WHERE id = post_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle favorite status
CREATE OR REPLACE FUNCTION public.toggle_favorite(post_uuid UUID)
RETURNS boolean AS $$
DECLARE
    is_favorited boolean;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM public.favorites 
        WHERE user_id = auth.uid() AND post_id = post_uuid
    ) INTO is_favorited;
    
    IF is_favorited THEN
        DELETE FROM public.favorites 
        WHERE user_id = auth.uid() AND post_id = post_uuid;
        RETURN false;
    ELSE
        INSERT INTO public.favorites (user_id, post_id) 
        VALUES (auth.uid(), post_uuid);
        RETURN true;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
