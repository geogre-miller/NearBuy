import { router } from 'expo-router';
import { Filter, Grid2x2 as Grid, List, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const products = [
  { id: '1', name: 'Rau muống tươi', price: '15,000', seller: 'Chị Hoa', rating: 4.8, image: '🥬', location: '2km' },
  { id: '2', name: 'Cà chua bi', price: '25,000', seller: 'Anh Nam', rating: 4.6, image: '🍅', location: '1.5km' },
  { id: '3', name: 'Cải thảo', price: '20,000', seller: 'Cô Mai', rating: 4.9, image: '🥬', location: '3km' },
  { id: '4', name: 'Bí đỏ', price: '18,000', seller: 'Chú Tấn', rating: 4.7, image: '🎃', location: '2.5km' },
  { id: '5', name: 'Khoai tây', price: '22,000', seller: 'Bà Liên', rating: 4.8, image: '🥔', location: '1km' },
  { id: '6', name: 'Cà rốt', price: '30,000', seller: 'Anh Dũng', rating: 4.5, image: '🥕', location: '2.2km' },
];

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const handleProductPress = (product: any) => {
    router.push('../product-detail/');
  };

  const ProductCard = ({ product, isGrid }: { product: any; isGrid: boolean }) => (
    <TouchableOpacity
      style={[styles.productCard, isGrid ? styles.gridCard : styles.listCard]}
      onPress={() => handleProductPress(product)}
    >
      <Text style={[styles.productImage, isGrid ? styles.gridImage : styles.listImage]}>
        {product.image}
      </Text>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}đ/kg</Text>
        <View style={styles.sellerRow}>
          <Text style={styles.sellerName}>{product.seller}</Text>
          <Text style={styles.location}>📍 {product.location}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buyNowText}>Mua ngay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailButton} onPress={() => handleProductPress(product)}>
            <Text style={styles.detailText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rau củ quả tươi</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm trong danh mục..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filter and View Toggle */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="#FF6B35" />
            <Text style={styles.filterText}>Lọc</Text>
          </TouchableOpacity>
          
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewButton, isGridView && styles.activeViewButton]}
              onPress={() => setIsGridView(true)}
            >
              <Grid size={20} color={isGridView ? '#FFFFFF' : '#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, !isGridView && styles.activeViewButton]}
              onPress={() => setIsGridView(false)}
            >
              <List size={20} color={!isGridView ? '#FFFFFF' : '#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters (when expanded) */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <Text style={styles.filterTitle}>Khoảng giá:</Text>
            <View style={styles.priceFilters}>
              <TouchableOpacity style={styles.priceChip}>
                <Text style={styles.priceChipText}>Dưới 20k</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceChip}>
                <Text style={styles.priceChipText}>20k - 50k</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceChip}>
                <Text style={styles.priceChipText}>Trên 50k</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.filterTitle}>Khoảng cách:</Text>
            <View style={styles.priceFilters}>
              <TouchableOpacity style={styles.priceChip}>
                <Text style={styles.priceChipText}>Dưới 2km</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceChip}>
                <Text style={styles.priceChipText}>2-5km</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Products List */}
      <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
        <View style={isGridView ? styles.gridContainer : styles.listContainer}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isGrid={isGridView} />
          ))}
        </View>
        
        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải thêm sản phẩm...</Text>
        </View>
      </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
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
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  filterText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 2,
  },
  viewButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeViewButton: {
    backgroundColor: '#FF6B35',
  },
  filtersContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  priceFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  priceChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  priceChipText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  listContainer: {
    paddingTop: 16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridCard: {
    width: '48%',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productImage: {
    textAlign: 'center',
    marginBottom: 8,
  },
  gridImage: {
    fontSize: 40,
  },
  listImage: {
    fontSize: 32,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
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
  sellerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  location: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#9CA3AF',
  },
  ratingRow: {
    marginBottom: 12,
  },
  rating: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  detailButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#9CA3AF',
  },
});