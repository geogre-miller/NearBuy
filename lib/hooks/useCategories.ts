import { useCallback, useEffect, useState } from 'react'
import { CategoriesApi } from '../api/categories'

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryWithProducts extends Category {
  posts?: { count: number }[]
  product_count?: number
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await CategoriesApi.getCategories()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      console.error('Error in useCategories:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  }
}

export function useCategoriesWithProductCounts() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await CategoriesApi.getCategoriesWithProductCounts()
      
      // Transform the data to include product count
      const transformedData = data.map(category => ({
        ...category,
        product_count: category.posts?.length || 0
      }))
      
      setCategories(transformedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      console.error('Error in useCategoriesWithProductCounts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  }
}

export function useCategoryProducts(categoryId: string | null) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchProducts = useCallback(async (reset = false) => {
    if (!categoryId) return

    try {
      setLoading(true)
      setError(null)
      
      const offset = reset ? 0 : products.length
      const data = await CategoriesApi.getProductsByCategory(categoryId, 20, offset)
      
      if (reset) {
        setProducts(data)
      } else {
        setProducts(prev => [...prev, ...data])
      }
      
      setHasMore(data.length === 20)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
      console.error('Error in useCategoryProducts:', err)
    } finally {
      setLoading(false)
    }
  }, [categoryId, products.length])

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(false)
    }
  }

  const refresh = () => {
    fetchProducts(true)
  }

  useEffect(() => {
    if (categoryId) {
      setProducts([])
      setHasMore(true)
      fetchProducts(true)
    } else {
      setProducts([])
      setHasMore(true)
    }
  }, [categoryId, fetchProducts])

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  }
}
