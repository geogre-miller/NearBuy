import { router } from 'expo-router';
import { ArrowLeft, MessageCircle, Minus, Plus, ShoppingCart, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const { width } = Dimensions.get('window');

const productImages = ['🥬', '🥬', '🥬', '🥬'];

const reviews = [
  { id: '1', user: 'Cô Lan', rating: 5, comment: 'Rau rất tươi, giao hàng nhanh!', date: '20/01/2025', images: ['📸'] },
  { id: '2', user: 'Chú Minh', rating: 4, comment: 'Chất lượng tốt, giá cả hợp lý', date: '18/01/2025', images: [] },
  { id: '3', user: 'Bà Hương', rating: 5, comment: 'Người bán nhiệt tình, rau sạch', date: '15/01/2025', images: ['📸', '📸'] },
];

export default function ProductDetailScreen() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const product = {
    name: 'Rau muống tươi',
    price: 15000,
    seller: 'Chị Hoa',
    rating: 4.8,
    totalReviews: 124,
    location: '2km từ bạn',
    description: 'Rau muống tươi ngon, được hái vào sáng sớm từ vườn nhà. Rau được trồng hoàn toàn tự nhiên, không sử dụng thuốc trừ sâu. Chất lượng đảm bảo, giá cả phải chăng. Thích hợp cho các món xào, luộc, nấu canh.',
    availability: 'Còn 25kg',
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) {
      Alert.alert('Thông báo', 'Tối đa chỉ được mua 10kg cho mỗi sản phẩm');
      return;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    Alert.alert('Thành công', `Đã thêm ${quantity}kg ${product.name} vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    Alert.alert('Mua ngay', `Tiến hành mua ${quantity}kg ${product.name}`);
  };

  const handleContactSeller = () => {
    Alert.alert(
      'Liên hệ người bán',
      'Chọn cách liên hệ:',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Gọi điện', onPress: () => console.log('Call seller') },
        { text: 'Nhắn tin', onPress: () => console.log('Message seller') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity style={styles.cartButton}>
          <ShoppingCart size={24} color="#FF6B35" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Text style={styles.mainImage}>{productImages[selectedImageIndex]}</Text>
          <View style={styles.thumbnailContainer}>
            {productImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.thumbnail,
                  index === selectedImageIndex && styles.activeThumbnail
                ]}
                onPress={() => setSelectedImageIndex(index)}
              >
                <Text style={styles.thumbnailImage}>{image}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price.toLocaleString('vi-VN')}đ/kg</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingLeft}>
              <Star size={16} color="#FFC107" fill="#FFC107" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.totalReviews} đánh giá)</Text>
            </View>
            <Text style={styles.availability}>{product.availability}</Text>
          </View>

          {/* Seller Info */}
          <View style={styles.sellerCard}>
            <View style={styles.sellerLeft}>
              <Text style={styles.sellerAvatar}>👩‍🌾</Text>
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{product.seller}</Text>
                <Text style={styles.sellerLocation}>📍 {product.location}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.contactSellerButton} onPress={handleContactSeller}>
              <MessageCircle size={16} color="#4CAF50" />
              <Text style={styles.contactSellerText}>Liên hệ</Text>
            </TouchableOpacity>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Số lượng:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(quantity - 1)}
              >
                <Minus size={20} color="#6B7280" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity} kg</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(quantity + 1)}
              >
                <Plus size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <TouchableOpacity
              style={styles.descriptionHeader}
              onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
              <Text style={styles.expandIcon}>
                {isDescriptionExpanded ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>
            
            {isDescriptionExpanded && (
              <Text style={styles.descriptionText}>
                {product.description || 'Mô tả sản phẩm đang được cập nhật...'}
              </Text>
            )}
          </View>

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.reviewsTitle}>Đánh giá khách hàng</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllReviews}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            
            {reviews.slice(0, 2).map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      color={i < review.rating ? '#FFC107' : '#E5E5E5'}
                      fill={i < review.rating ? '#FFC107' : '#E5E5E5'}
                    />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                {review.images.length > 0 && (
                  <View style={styles.reviewImages}>
                    {review.images.map((image, index) => (
                      <Text key={index} style={styles.reviewImage}>{image}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    alignItems: 'center',
  },
  mainImage: {
    fontSize: 120,
    marginBottom: 16,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: '#FF6B35',
  },
  thumbnailImage: {
    fontSize: 24,
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  availability: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
  },
  sellerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sellerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sellerAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  sellerLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  contactSellerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  contactSellerText: {
    color: '#4CAF50',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  quantityButton: {
    padding: 12,
    minWidth: 48,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    minWidth: 60,
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  expandIcon: {
    fontSize: 14,
    color: '#6B7280',
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 24,
    marginTop: 8,
  },
  reviewsSection: {
    marginBottom: 100,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  viewAllReviews: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
  },
  reviewCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewImages: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewImage: {
    fontSize: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});