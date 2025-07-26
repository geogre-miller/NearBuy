// import { supabase } from '../supabase/client'

// import type { PaginatedResponse, PaginationParams, Post, SearchFilters } from '../../types'

// export class PostsApi {
//   // Get posts with filters and pagination
//   static async getPosts(
//     filters: SearchFilters = {},
//     pagination: PaginationParams = { page: 1, limit: 20 }
//   ): Promise<PaginatedResponse<Post>> {
//     try {
//       const { page, limit } = pagination
//       const offset = (page - 1) * limit

//       let query = supabase
//         .from('posts')
//         .select(`
//           *,
//           user_profiles!posts_user_id_fkey (
//             full_name,
//             avatar_url,
//             rating,
//             total_sales
//           ),
//           categories (
//             name,
//             name_vietnamese
//           ),
//           post_media (
//             media_url,
//             media_type,
//             is_primary
//           )
//         `)
//         .eq('status', 'active')
//         .range(offset, offset + limit - 1)
      
//       const { data, error, count } = await query
      
//       if (error) throw error
      
//       return {
//         data: data as Post[],
//         pagination: {
//           page,
//           limit,
//           total: count || 0
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error)
//       return {
//         data: [],
//         pagination: {
//           page: pagination.page,
//           limit: pagination.limit,
//           total: 0
//         }
//       }
//     }
//   }
// }

     