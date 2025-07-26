import { supabase } from '../supabase/client'

export class CategoriesApi {
  // Get all active categories
  static async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  // Get active categories with product counts
  static async getCategoriesWithProductCounts() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          posts!inner(count)
        `)
        .eq('is_active', true)
        .eq('posts.status', 'active')
        .order('name', { ascending: true })

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching categories with product counts:', error)
      throw error
    }
  }

  // Get products by category
  static async getProductsByCategory(categoryId: string, limit = 20, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          categories!inner(name, icon, color),
          profiles!inner(full_name, avatar_url),
          post_images(image_url, display_order)
        `)
        .eq('category_id', categoryId)
        .eq('status', 'active')
        .eq('categories.is_active', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching products by category:', error)
      throw error
    }
  }
}