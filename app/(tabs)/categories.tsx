import { useCategories, useCategoryProducts } from '@/lib/hooks/useCategories';
import { router } from 'expo-router';
import { Filter, Grid2x2 as Grid, List, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { products, loading: productsLoading, error: productsError, loadMore, hasMore } = useCategoryProducts(selectedCategoryId);

  // Use the first category as default when categories load
  React.useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

  const handleProductPress = (product: any) => {
    router.push('../product-detail/');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const ProductCard = ({ product, isGrid }: { product: any; isGrid: boolean }) => {
    // Transform database product to display format
    const displayProduct = {
      id: product.id,
      name: product.title,
      price: product.price?.toLocaleString('vi-VN') || '0',
      seller: product.profiles?.full_name || 'Người bán',
      rating: 4.5, // Default rating, you can add this to your database
      image: product.post_images?.[0]?.image_url ? '🖼️' : product.categories?.icon || '📦',
      location: product.location || 'Ngọc Hồi'
    };

    return (
      <TouchableOpacity
        style={[styles.productCard, isGrid ? styles.gridCard : styles.listCard]}
        onPress={() => handleProductPress(product)}
      >
        <Text style={[styles.productImage, isGrid ? styles.gridImage : styles.listImage]}>
          {displayProduct.image}
        </Text>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{displayProduct.name}</Text>
          <Text style={styles.productPrice}>{displayProduct.price}đ</Text>
          <View style={styles.sellerRow}>
            <Text style={styles.sellerName}>{displayProduct.seller}</Text>
            <Text style={styles.location}>📍 {displayProduct.location}</Text>
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {displayProduct.rating}</Text>
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
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedCategory?.name || 'Danh mục sản phẩm'}
        </Text>
        
        {/* Category Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categorySelector}
          contentContainerStyle={styles.categorySelectorContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategoryId === category.id && styles.selectedCategoryChip
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryName,
                selectedCategoryId === category.id && styles.selectedCategoryName
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
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
      {categoriesLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Đang tải danh mục...</Text>
        </View>
      ) : categoriesError ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Lỗi: {categoriesError}</Text>
        </View>
      ) : (
        <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
          {productsLoading && products.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B35" />
              <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
            </View>
          ) : productsError ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.errorText}>Lỗi: {productsError}</Text>
            </View>
          ) : products.length === 0 ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Không có sản phẩm trong danh mục này</Text>
            </View>
          ) : (
            <View style={isGridView ? styles.gridContainer : styles.listContainer}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} isGrid={isGridView} />
              ))}
            </View>
          )}
          
          {/* Load more button */}
          {hasMore && products.length > 0 && (
            <TouchableOpacity 
              style={styles.loadMoreButton} 
              onPress={loadMore}
              disabled={productsLoading}
            >
              {productsLoading ? (
                <ActivityIndicator size="small" color="#FF6B35" />
              ) : (
                <Text style={styles.loadMoreText}>Tải thêm sản phẩm</Text>
              )}
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
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
  iconText: {
    fontSize: 20,
    color: '#FF6B35',
  },
  categorySelector: {
    marginBottom: 16,
  },
  categorySelectorContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedCategoryChip: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedCategoryName: {
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
});