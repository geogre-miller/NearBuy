// Common types for the SMTOWN Marketplace app

export interface User {
  id: string
  email: string
  full_name: string
  phone_number?: string
  address?: string
  ward?: string
  district: string
  province: string
  avatar_url?: string
  is_verified: boolean
  is_active: boolean
  rating: number
  total_reviews: number
  total_sales: number
  bio?: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  category_id?: string
  title: string
  description: string
  price?: number
  is_negotiable: boolean
  condition: PostCondition
  post_type: PostType
  status: PostStatus
  location_detail?: string
  ward?: string
  latitude?: number
  longitude?: number
  contact_method: ContactMethod
  view_count: number
  is_featured: boolean
  expires_at?: string
  created_at: string
  updated_at: string
  
  // Relations
  user?: User
  category?: Category
  media?: PostMedia[]
  is_favorited?: boolean
  favorite_count?: number
  comment_count?: number
}

export interface Category {
  id: string
  name: string
  name_vietnamese: string
  description?: string
  icon_url?: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface PostMedia {
  id: string
  post_id: string
  media_url: string
  media_type: MediaType
  sort_order: number
  is_primary: boolean
  created_at: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  parent_comment_id?: string
  content: string
  is_deleted: boolean
  created_at: string
  updated_at: string
  
  // Relations
  user?: User
  replies?: Comment[]
}

export interface Favorite {
  id: string
  user_id: string
  post_id: string
  created_at: string
  
  // Relations
  post?: Post
}

export interface Review {
  id: string
  reviewer_id: string
  reviewed_user_id: string
  post_id?: string
  rating: number
  comment?: string
  transaction_type?: TransactionType
  created_at: string
  
  // Relations
  reviewer?: User
  post?: Post
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  post_id?: string
  content: string
  is_read: boolean
  message_type: MessageType
  created_at: string
  
  // Relations
  sender?: User
  receiver?: User
  post?: Post
}

export interface Conversation {
  id: string
  user1_id: string
  user2_id: string
  post_id?: string
  last_message_at: string
  created_at: string
  
  // Relations
  user1?: User
  user2?: User
  post?: Post
  last_message?: string
  unread_count?: number
  other_user?: User
}

// Enums
export type PostCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor'
export type PostType = 'sell' | 'buy' | 'exchange' | 'service' | 'free'
export type PostStatus = 'active' | 'sold' | 'hidden' | 'expired'
export type ContactMethod = 'phone' | 'message' | 'both'
export type MediaType = 'image' | 'video'
export type MessageType = 'text' | 'image' | 'offer'
export type TransactionType = 'buy' | 'sell' | 'exchange' | 'service'

// Search and Filter types
export interface SearchFilters {
  query?: string
  category_id?: string
  min_price?: number
  max_price?: number
  condition?: PostCondition[]
  post_type?: PostType[]
  ward?: string
  sort_by?: 'created_at' | 'price' | 'view_count' | 'rating'
  sort_order?: 'asc' | 'desc'
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

// Location types
export interface Location {
  latitude: number
  longitude: number
  address?: string
  ward?: string
  district?: string
  province?: string
}

// Navigation types (for Expo Router)
export interface TabParamList {
  index: undefined
  search: undefined
  favorites: undefined
  messages: undefined
  profile: undefined
  sell: undefined
}

export interface StackParamList {
  '(tabs)': undefined
  '(auth)': undefined
  'post/[id]': { id: string }
  'post/edit/[id]': { id: string }
  'post/create': undefined
  'user/[id]': { id: string }
  'user/edit-profile': undefined
  'user/my-posts': undefined
  'user/reviews': undefined
  'chat/index': undefined
  'chat/[conversationId]': { conversationId: string }
  'chat/new': { userId?: string; postId?: string }
  'settings/index': undefined
  'settings/notifications': undefined
  'settings/privacy': undefined
  'settings/about': undefined
}
