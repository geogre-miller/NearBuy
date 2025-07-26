import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import type { Post } from '../../types'

interface PostCardProps {
  post: Post
  onPress: () => void
  onFavoritePress?: () => void
}

export function PostCard({ post, onPress, onFavoritePress }: PostCardProps) {
  const primaryImage = post.media?.find(m => m.is_primary)?.media_url
  const formattedPrice = post.price ? formatVND(post.price) : 'Liên hệ'
  const condition = getConditionText(post.condition)
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Image */}
      <View style={styles.imageContainer}>
        {primaryImage ? (
          <Image source={{ uri: primaryImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Không có ảnh</Text>
          </View>
        )}
        
        {/* Favorite button */}
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favoriteIcon}>
              {post.is_favorited ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        )}
        
        {/* Type badge */}
        <View style={[styles.typeBadge, getTypeBadgeStyle(post.post_type)]}>
          <Text style={styles.typeBadgeText}>{getTypeText(post.post_type)}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
        
        <Text style={styles.price}>{formattedPrice}</Text>
        
        <View style={styles.metadata}>
          <Text style={styles.condition}>{condition}</Text>
          <Text style={styles.location}>{post.ward || 'Ngọc Hồi'}</Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.seller}>
            <Image 
              source={{ uri: post.user?.avatar_url || 'https://via.placeholder.com/24' }} 
              style={styles.avatar}
            />
            <Text style={styles.sellerName} numberOfLines={1}>
              {post.user?.full_name || 'Người dùng'}
            </Text>
          </View>
          
          <View style={styles.stats}>
            <Text style={styles.views}>{post.view_count} lượt xem</Text>
            {post.user?.rating && post.user.rating > 0 && (
              <Text style={styles.rating}>⭐ {post.user.rating.toFixed(1)}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// Utility functions
function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount)
}

function getConditionText(condition: string): string {
  const conditions = {
    new: 'Mới',
    like_new: 'Như mới',
    good: 'Tốt',
    fair: 'Ổn',
    poor: 'Cũ',
  }
  return conditions[condition as keyof typeof conditions] || condition
}

function getTypeText(type: string): string {
  const types = {
    sell: 'Bán',
    buy: 'Mua',
    exchange: 'Trao đổi',
    service: 'Dịch vụ',
    free: 'Miễn phí',
  }
  return types[type as keyof typeof types] || type
}

function getTypeBadgeStyle(type: string) {
  const styles = {
    sell: { backgroundColor: '#10B981' },
    buy: { backgroundColor: '#3B82F6' },
    exchange: { backgroundColor: '#F59E0B' },
    service: { backgroundColor: '#8B5CF6' },
    free: { backgroundColor: '#EF4444' },
  }
  return styles[type as keyof typeof styles] || { backgroundColor: '#6B7280' }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  condition: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seller: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  sellerName: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  stats: {
    alignItems: 'flex-end',
  },
  views: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  rating: {
    fontSize: 10,
    color: '#F59E0B',
    marginTop: 2,
  },
})
