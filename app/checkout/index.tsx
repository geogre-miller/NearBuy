import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CheckoutScreen() {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: 'Nguyễn Văn Nam',
    phone: '0123456789',
    address: '123 Đường ABC, Phường XYZ, Thị trấn DEF',
    specialInstructions: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  const orderItems = [
    { id: '1', name: 'Rau muống tươi', quantity: 2, price: 15000, image: '🥬' },
    { id: '2', name: 'Cà chua bi', quantity: 1, price: 25000, image: '🍅' },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15000;
  const total = subtotal + deliveryFee;

  const handleConfirmOrder = async () => {
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Đặt hàng thành công! 🎉',
        'Đơn hàng của bạn đã được xác nhận. Người bán sẽ liên hệ sớm nhất.',
        [
          {
            text: 'Theo dõi đơn hàng',
            onPress: () => router.replace('/(tabs)/orders')
          }
        ]
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📍</Text>
            <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          </View>
          
          <View style={styles.addressCard}>
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={customerInfo.fullName}
              onChangeText={(text) => setCustomerInfo({...customerInfo, fullName: text})}
              placeholderTextColor="#9CA3AF"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={customerInfo.phone}
              onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
            
            <TextInput
              style={[styles.input, styles.addressInput]}
              placeholder="Địa chỉ chi tiết"
              value={customerInfo.address}
              onChangeText={(text) => setCustomerInfo({...customerInfo, address: text})}
              multiline
              numberOfLines={3}
              placeholderTextColor="#9CA3AF"
            />
            
            <TextInput
              style={[styles.input, styles.instructionsInput]}
              placeholder="Ghi chú đặc biệt (không bắt buộc)"
              value={customerInfo.specialInstructions}
              onChangeText={(text) => setCustomerInfo({...customerInfo, specialInstructions: text})}
              multiline
              numberOfLines={2}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sản phẩm đặt mua</Text>
          </View>
          
          <View style={styles.itemsCard}>
            {orderItems.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.itemImage}>{item.image}</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>{item.quantity}kg × {item.price.toLocaleString('vi-VN')}đ</Text>
                </View>
                <Text style={styles.itemTotal}>
                  {(item.quantity * item.price).toLocaleString('vi-VN')}đ
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💳</Text>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          </View>
          
          <View style={styles.paymentCard}>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'cash' && styles.selectedPayment]}
              onPress={() => setPaymentMethod('cash')}
            >
              <View style={styles.paymentLeft}>
                <Text style={styles.paymentIcon}>💵</Text>
                <View>
                  <Text style={styles.paymentTitle}>Tiền mặt khi nhận hàng</Text>
                  <Text style={styles.paymentDescription}>Thanh toán khi nhận hàng</Text>
                </View>
              </View>
              <View style={[styles.radio, paymentMethod === 'cash' && styles.radioSelected]} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'transfer' && styles.selectedPayment]}
              onPress={() => setPaymentMethod('transfer')}
            >
              <View style={styles.paymentLeft}>
                <Text style={styles.paymentIcon}>🏦</Text>
                <View>
                  <Text style={styles.paymentTitle}>Chuyển khoản ngân hàng</Text>
                  <Text style={styles.paymentDescription}>Chuyển khoản trước khi giao</Text>
                </View>
              </View>
              <View style={[styles.radio, paymentMethod === 'transfer' && styles.radioSelected]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính:</Text>
              <Text style={styles.summaryValue}>{subtotal.toLocaleString('vi-VN')}đ</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí giao hàng:</Text>
              <Text style={styles.summaryValue}>{deliveryFee.toLocaleString('vi-VN')}đ</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalValue}>{total.toLocaleString('vi-VN')}đ</Text>
            </View>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.sectionIcon}>🚚</Text>
            <Text style={styles.deliveryText}>
              Dự kiến giao hàng trong 30-60 phút
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.confirmButton, isProcessing && styles.processingButton]}
          onPress={handleConfirmOrder}
          disabled={isProcessing}
        >
          <Text style={styles.confirmButtonText}>
            {isProcessing ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
          </Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  instructionsInput: {
    height: 60,
    textAlignVertical: 'top',
    marginBottom: 0,
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemImage: {
    fontSize: 24,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  itemTotal: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedPayment: {
    backgroundColor: '#FFF8DC',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  paymentDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  radioSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
  },
  deliveryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  processingButton: {
    backgroundColor: '#9CA3AF',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
});