import { CircleCheck as CheckCircle, Clock, Star, Truck } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'preparing' | 'shipping' | 'delivered';
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  seller: string;
  deliveryTime?: string;
}

export default function OrdersScreen() {
  const [orders] = useState<Order[]>([
    {
      id: 'DH001',
      date: '24/01/2025',
      total: 75000,
      status: 'shipping',
      items: [
        { name: 'Rau muống tươi', quantity: 2, price: 15000, image: '🥬' },
        { name: 'Cà chua bi', quantity: 1, price: 25000, image: '🍅' },
      ],
      seller: 'Chị Hoa',
      deliveryTime: '30 phút',
    },
    {
      id: 'DH002',
      date: '23/01/2025',
      total: 120000,
      status: 'delivered',
      items: [
        { name: 'Cải thảo', quantity: 2, price: 20000, image: '🥬' },
        { name: 'Khoai tây', quantity: 3, price: 22000, image: '🥔' },
      ],
      seller: 'Cô Mai',
    },
    {
      id: 'DH003',
      date: '22/01/2025',
      total: 45000,
      status: 'preparing',
      items: [
        { name: 'Cà rốt', quantity: 1, price: 30000, image: '🥕' },
      ],
      seller: 'Anh Dũng',
      deliveryTime: '45 phút',
    },
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'preparing':
        return { 
          icon: <Clock size={20} color="#FFC107" />, 
          text: 'Đang chuẩn bị', 
          color: '#FFC107',
          bgColor: '#FFF8E1' 
        };
      case 'shipping':
        return { 
          icon: <Truck size={20} color="#2196F3" />, 
          text: 'Đang giao hàng', 
          color: '#2196F3',
          bgColor: '#E3F2FD' 
        };
      case 'delivered':
        return { 
          icon: <CheckCircle size={20} color="#4CAF50" />, 
          text: 'Đã giao hàng', 
          color: '#4CAF50',
          bgColor: '#E8F5E8' 
        };
      default:
        return { 
          icon: <Clock size={20} color="#9CA3AF" />, 
          text: 'Không xác định', 
          color: '#9CA3AF',
          bgColor: '#F5F5F5' 
        };
    }
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const statusInfo = getStatusInfo(order.status);
    
    return (
      <View style={styles.orderCard}>
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Đơn hàng #{order.id}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
            {statusInfo.icon}
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.text}
            </Text>
          </View>
        </View>

        {/* Delivery Time (if applicable) */}
        {order.deliveryTime && order.status !== 'delivered' && (
          <View style={styles.deliveryTimeContainer}>
            <Text style={styles.deliveryTimeText}>
              🕐 Dự kiến giao trong {order.deliveryTime}
            </Text>
          </View>
        )}

        {/* Order Items */}
        <View style={styles.itemsContainer}>
          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.itemImage}>{item.image}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  {item.quantity} kg × {item.price.toLocaleString('vi-VN')}đ
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                {(item.quantity * item.price).toLocaleString('vi-VN')}đ
              </Text>
            </View>
          ))}
        </View>

        {/* Seller Info */}
        <View style={styles.sellerContainer}>
          <Text style={styles.sellerText}>Người bán: {order.seller}</Text>
        </View>

        {/* Order Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalValue}>{order.total.toLocaleString('vi-VN')}đ</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {order.status === 'delivered' ? (
            <TouchableOpacity style={styles.reviewButton}>
              <Star size={16} color="#FFFFFF" />
              <Text style={styles.reviewButtonText}>Đánh giá đơn hàng</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackButtonText}>Theo dõi đơn hàng</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Liên hệ người bán</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn hàng của bạn</Text>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Chưa có đơn hàng nào</Text>
            <Text style={styles.emptyText}>Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên</Text>
          </View>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
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
  },
  ordersList: {
    flex: 1,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  deliveryTimeContainer: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  deliveryTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
    textAlign: 'center',
  },
  itemsContainer: {
    marginBottom: 12,
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
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  sellerContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 12,
  },
  sellerText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
});