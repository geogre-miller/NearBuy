import { useEffect, useState } from 'react'
import type { PaginationParams, Post, SearchFilters } from '../../types'
import { PostsApi } from '../api/posts'

export function usePosts(filters: SearchFilters = {}, pagination: PaginationParams = { page: 1, limit: 20 }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)

      const response = await PostsApi.getPosts(filters, pagination)
      
      if (reset) {
        setPosts(response.data)
      } else {
        setPosts(prev => [...prev, ...response.data])
      }
      
      setHasMore(response.pagination.has_next)
      setTotalCount(response.pagination.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchPosts(false)
    }
  }

  const refresh = () => {
    fetchPosts(true)
  }

  useEffect(() => {
    fetchPosts(true)
  }, [filters.query, filters.category_id, filters.ward, filters.sort_by])

  return {
    posts,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refresh,
  }
}

export function usePost(id: string, userId?: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await PostsApi.getPost(id, userId)
      setPost(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch post')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async () => {
    if (!userId || !post) return

    try {
      const isFavorited = await PostsApi.toggleFavorite(post.id, userId)
      setPost(prev => prev ? { ...prev, is_favorited: isFavorited } : null)
    } catch (err) {
      console.error('Error toggling favorite:', err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id, userId])

  return {
    post,
    loading,
    error,
    refresh: fetchPost,
    toggleFavorite,
  }
}

export function useUserPosts(userId: string, pagination: PaginationParams = { page: 1, limit: 20 }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)

  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)

      const response = await PostsApi.getUserPosts(userId, pagination)
      
      if (reset) {
        setPosts(response.data)
      } else {
        setPosts(prev => [...prev, ...response.data])
      }
      
      setHasMore(response.pagination.has_next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user posts')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchPosts(false)
    }
  }

  const refresh = () => {
    fetchPosts(true)
  }

  useEffect(() => {
    if (userId) {
      fetchPosts(true)
    }
  }, [userId])

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  }
}

export function useFavorites(userId: string, pagination: PaginationParams = { page: 1, limit: 20 }) {
  const [favorites, setFavorites] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)

  const fetchFavorites = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)

      const response = await PostsApi.getFavorites(userId, pagination)
      
      if (reset) {
        setFavorites(response.data)
      } else {
        setFavorites(prev => [...prev, ...response.data])
      }
      
      setHasMore(response.pagination.has_next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch favorites')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchFavorites(false)
    }
  }

  const refresh = () => {
    fetchFavorites(true)
  }

  const removeFavorite = async (postId: string) => {
    try {
      await PostsApi.toggleFavorite(postId, userId)
      setFavorites(prev => prev.filter(post => post.id !== postId))
    } catch (err) {
      console.error('Error removing favorite:', err)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchFavorites(true)
    }
  }, [userId])

  return {
    favorites,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    removeFavorite,
  }
}
