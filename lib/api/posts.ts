import type { PaginatedResponse, PaginationParams, Post, SearchFilters } from '../../types'
import { supabase } from '../supabase/client'

export class PostsApi {
  // Get posts with filters and pagination
  static async getPosts(
    filters: SearchFilters = {},
    pagination: PaginationParams = { page: 1, limit: 20 }
  ): Promise<PaginatedResponse<Post>> {
    try {
      const { page, limit } = pagination
      const offset = (page - 1) * limit

      let query = supabase
        .from('posts')
        .select(`
          *,
          user_profiles!posts_user_id_fkey (
            full_name,
            avatar_url,
            rating,
            total_sales
          ),
          categories (
            name,
            name_vietnamese
          ),
          post_media (
            media_url,
            media_type,
            is_primary
          )
        `)
        .eq('status', 'active')

      // Apply filters
      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`)
      }

      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id)
      }

      if (filters.min_price) {
        query = query.gte('price', filters.min_price)
      }

      if (filters.max_price) {
        query = query.lte('price', filters.max_price)
      }

      if (filters.condition && filters.condition.length > 0) {
        query = query.in('condition', filters.condition)
      }

      if (filters.post_type && filters.post_type.length > 0) {
        query = query.in('post_type', filters.post_type)
      }

      if (filters.ward) {
        query = query.eq('ward', filters.ward)
      }

      // Apply sorting
      const sortBy = filters.sort_by || 'created_at'
      const sortOrder = filters.sort_order || 'desc'
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })

      // Get total count for pagination
      const { count } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      // Apply pagination
      const { data, error } = await query
        .range(offset, offset + limit - 1)

      if (error) throw error

      const total = count || 0
      const total_pages = Math.ceil(total / limit)

      return {
        data: data as Post[],
        pagination: {
          page,
          limit,
          total,
          total_pages,
          has_next: page < total_pages,
          has_prev: page > 1,
        },
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  }

  // Get single post by ID
  static async getPost(id: string, userId?: string): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user_profiles!posts_user_id_fkey (
            full_name,
            phone_number,
            avatar_url,
            rating,
            total_reviews,
            total_sales,
            bio,
            created_at
          ),
          categories (
            name_vietnamese
          ),
          post_media (
            media_url,
            media_type,
            is_primary,
            sort_order
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      let post = data as Post

      // Check if post is favorited by current user
      if (userId) {
        const { data: favoriteData } = await supabase
          .from('favorites')
          .select('id')
          .eq('user_id', userId)
          .eq('post_id', id)
          .single()

        post.is_favorited = !!favoriteData
      }

      // Increment view count
      await supabase.rpc('increment_post_views', { post_uuid: id })

      return post
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }

  // Create new post
  static async createPost(postData: Partial<Post>, mediaUrls: string[] = []): Promise<Post> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert(postData)
        .select()
        .single()

      if (error) throw error

      const post = data as Post

      // Add media if provided
      if (mediaUrls.length > 0) {
        const mediaData = mediaUrls.map((url, index) => ({
          post_id: post.id,
          media_url: url,
          media_type: 'image' as const,
          sort_order: index,
          is_primary: index === 0,
        }))

        const { error: mediaError } = await supabase
          .from('post_media')
          .insert(mediaData)

        if (mediaError) {
          console.error('Error adding media:', mediaError)
        }
      }

      return post
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  // Update post
  static async updatePost(id: string, updates: Partial<Post>): Promise<Post> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return data as Post
    } catch (error) {
      console.error('Error updating post:', error)
      throw error
    }
  }

  // Delete post
  static async deletePost(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  }

  // Get user's posts
  static async getUserPosts(
    userId: string,
    pagination: PaginationParams = { page: 1, limit: 20 }
  ): Promise<PaginatedResponse<Post>> {
    try {
      const { page, limit } = pagination
      const offset = (page - 1) * limit

      const { data, error, count } = await supabase
        .from('posts')
        .select(`
          *,
          categories (name_vietnamese),
          post_media (
            media_url,
            is_primary
          )
        `, { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) throw error

      const total = count || 0
      const total_pages = Math.ceil(total / limit)

      return {
        data: data as Post[],
        pagination: {
          page,
          limit,
          total,
          total_pages,
          has_next: page < total_pages,
          has_prev: page > 1,
        },
      }
    } catch (error) {
      console.error('Error fetching user posts:', error)
      throw error
    }
  }

  // Toggle favorite
  static async toggleFavorite(postId: string, userId: string): Promise<boolean> {
    try {
      const { data: existingFavorite } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .single()

      if (existingFavorite) {
        // Remove favorite
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('post_id', postId)

        if (error) throw error
        return false
      } else {
        // Add favorite
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: userId, post_id: postId })

        if (error) throw error
        return true
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    }
  }

  // Get user's favorites
  static async getFavorites(
    userId: string,
    pagination: PaginationParams = { page: 1, limit: 20 }
  ): Promise<PaginatedResponse<Post>> {
    try {
      const { page, limit } = pagination
      const offset = (page - 1) * limit

      const { data, error, count } = await supabase
        .from('favorites')
        .select(`
          created_at,
          posts (
            *,
            user_profiles!posts_user_id_fkey (
              full_name,
              rating
            ),
            categories (name_vietnamese),
            post_media (
              media_url,
              is_primary
            )
          )
        `, { count: 'exact' })
        .eq('user_id', userId)
        .not('posts', 'is', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) throw error

      const posts = data?.map(item => ({
        ...item.posts,
        is_favorited: true,
      })) as Post[]

      const total = count || 0
      const total_pages = Math.ceil(total / limit)

      return {
        data: posts,
        pagination: {
          page,
          limit,
          total,
          total_pages,
          has_next: page < total_pages,
          has_prev: page > 1,
        },
      }
    } catch (error) {
      console.error('Error fetching favorites:', error)
      throw error
    }
  }
}
