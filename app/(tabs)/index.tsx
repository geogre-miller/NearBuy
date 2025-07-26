import { useCategories } from '@/lib/hooks/useCategories';
import { router } from 'expo-router';
import { Bell, Search, ShoppingCart } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const featuredProducts = [
  { id: '1', name: 'Rau muống tươi', price: '15,000', seller: 'Chị Hoa', rating: 4.8, image: '🥬' },
  { id: '2', name: 'Cá rô phi', price: '45,000', seller: 'Anh Minh', rating: 4.9, image: '🐟' },
  { id: '3', name: 'Gạo ST25', price: '25,000', seller: 'Cô Lan', rating: 4.7, image: '🌾' },
];

const trustedSellers = [
  { id: '1', name: 'Chị Hoa', rating: 4.8, products: 25, avatar: '👩‍🌾' },
  { id: '2', name: 'Anh Minh', rating: 4.9, products: 30, avatar: '👨‍🌾' },
  { id: '3', name: 'Cô Lan', rating: 4.7, products: 18, avatar: '👵' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategories();

  const handleCategoryPress = (category: any) => {
    router.push('/(tabs)/categories');
  };

  const handleProductPress = (product: any) => {
    router.push('../product-detail/');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>🏪</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <ShoppingCart size={24} color="#FF6B35" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Bell size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Promotional Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>🎉 Khuyến mãi đặc biệt!</Text>
        <Text style={styles.bannerSubtitle}>Giảm giá 20% cho đơn hàng đầu tiên</Text>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color + '20' }]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
            >
              <Text style={styles.productImage}>{product.image}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}đ/kg</Text>
              <View style={styles.sellerInfo}>
                <Text style={styles.sellerName}>{product.seller}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {product.rating}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Mua ngay</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trusted Sellers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Người bán uy tín</Text>
        <View style={styles.sellersContainer}>
          {trustedSellers.map((seller) => (
            <TouchableOpacity key={seller.id} style={styles.sellerCard}>
              <Text style={styles.sellerAvatar}>{seller.avatar}</Text>
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerCardName}>{seller.name}</Text>
                <Text style={styles.sellerStats}>⭐ {seller.rating} • {seller.products} sản phẩm</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 32,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#1F2937',
  },
  banner: {
    backgroundColor: '#FF6B35',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 3,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  horizontalScroll: {
    marginHorizontal: -16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginLeft: 16,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
  },
  sellerInfo: {
    marginBottom: 12,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sellersContainer: {
    gap: 12,
  },
  sellerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sellerAvatar: {
    fontSize: 40,
    marginRight: 16,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  sellerStats: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  iconText: {
    fontSize: 20,
    color: '#FF6B35',
  },
});