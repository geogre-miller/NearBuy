// Database types generated from Supabase
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone_number: string | null
          address: string | null
          ward: string | null
          district: string | null
          province: string | null
          avatar_url: string | null
          is_verified: boolean | null
          is_active: boolean | null
          rating: number | null
          total_reviews: number | null
          total_sales: number | null
          bio: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          phone_number?: string | null
          address?: string | null
          ward?: string | null
          district?: string | null
          province?: string | null
          avatar_url?: string | null
          is_verified?: boolean | null
          is_active?: boolean | null
          rating?: number | null
          total_reviews?: number | null
          total_sales?: number | null
          bio?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          phone_number?: string | null
          address?: string | null
          ward?: string | null
          district?: string | null
          province?: string | null
          avatar_url?: string | null
          is_verified?: boolean | null
          is_active?: boolean | null
          rating?: number | null
          total_reviews?: number | null
          total_sales?: number | null
          bio?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          name_vietnamese: string
          description: string | null
          icon_url: string | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          name_vietnamese: string
          description?: string | null
          icon_url?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          name_vietnamese?: string
          description?: string | null
          icon_url?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          category_id: string | null
          title: string
          description: string
          price: number | null
          is_negotiable: boolean | null
          condition: string | null
          post_type: string
          status: string | null
          location_detail: string | null
          ward: string | null
          latitude: number | null
          longitude: number | null
          contact_method: string | null
          view_count: number | null
          is_featured: boolean | null
          expires_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          category_id?: string | null
          title: string
          description: string
          price?: number | null
          is_negotiable?: boolean | null
          condition?: string | null
          post_type?: string
          status?: string | null
          location_detail?: string | null
          ward?: string | null
          latitude?: number | null
          longitude?: number | null
          contact_method?: string | null
          view_count?: number | null
          is_featured?: boolean | null
          expires_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string | null
          title?: string
          description?: string
          price?: number | null
          is_negotiable?: boolean | null
          condition?: string | null
          post_type?: string
          status?: string | null
          location_detail?: string | null
          ward?: string | null
          latitude?: number | null
          longitude?: number | null
          contact_method?: string | null
          view_count?: number | null
          is_featured?: boolean | null
          expires_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      post_media: {
        Row: {
          id: string
          post_id: string
          media_url: string
          media_type: string | null
          sort_order: number | null
          is_primary: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          post_id: string
          media_url: string
          media_type?: string | null
          sort_order?: number | null
          is_primary?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          post_id?: string
          media_url?: string
          media_type?: string | null
          sort_order?: number | null
          is_primary?: boolean | null
          created_at?: string | null
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          parent_comment_id: string | null
          content: string
          is_deleted: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          parent_comment_id?: string | null
          content: string
          is_deleted?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          parent_comment_id?: string | null
          content?: string
          is_deleted?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          post_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          post_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string
          created_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          reviewer_id: string
          reviewed_user_id: string
          post_id: string | null
          rating: number
          comment: string | null
          transaction_type: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          reviewer_id: string
          reviewed_user_id: string
          post_id?: string | null
          rating: number
          comment?: string | null
          transaction_type?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          reviewer_id?: string
          reviewed_user_id?: string
          post_id?: string | null
          rating?: number
          comment?: string | null
          transaction_type?: string | null
          created_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          post_id: string | null
          content: string
          is_read: boolean | null
          message_type: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          post_id?: string | null
          content: string
          is_read?: boolean | null
          message_type?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          post_id?: string | null
          content?: string
          is_read?: boolean | null
          message_type?: string | null
          created_at?: string | null
        }
      }
      conversations: {
        Row: {
          id: string
          user1_id: string
          user2_id: string
          post_id: string | null
          last_message_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user1_id: string
          user2_id: string
          post_id?: string | null
          last_message_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user1_id?: string
          user2_id?: string
          post_id?: string | null
          last_message_at?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
