import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const handleEditProfile = () => {
    Alert.alert('Chỉnh sửa thông tin', 'Tính năng đang được phát triển');
  };

  const handleAddresses = () => {
    Alert.alert('Địa chỉ giao hàng', 'Tính năng đang được phát triển');
  };

  const handleSupport = () => {
    Alert.alert('Hỗ trợ khách hàng', 'Hotline: 1900-xxxx\nEmail: support@chothitran.vn');
  };

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.menuItems}>
        {children}
      </View>
    </View>
  );

  const MenuItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    destructive = false 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    destructive?: boolean;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          {icon}
        </View>
        <View style={styles.menuItemText}>
          <Text style={[styles.menuItemTitle, destructive && styles.destructiveText]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {showArrow && (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>

      {/* User Profile */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👨‍🌾</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Nguyễn Văn Nam</Text>
            <Text style={styles.userPhone}>📞 0123 456 789</Text>
            <View style={styles.userStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Đơn hàng</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Đánh giá</Text>
              </View>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editIcon}>⚙️</Text>
          <Text style={styles.editButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Sections */}
      <MenuSection title="Thông tin cá nhân">
        <MenuItem
          icon={<Text style={styles.menuIconText}>👤</Text>}
          title="Thông tin tài khoản"
          subtitle="Cập nhật thông tin cá nhân"
          onPress={handleEditProfile}
        />
        
        <MenuItem
          icon={<Text style={styles.menuIconText}>📍</Text>}
          title="Địa chỉ giao hàng"
          subtitle="Quản lý địa chỉ nhận hàng"
          onPress={handleAddresses}
        />
      </MenuSection>

      <MenuSection title="Đơn hàng">
        <MenuItem
          icon={<Text style={styles.menuIconText}>⏰</Text>}
          title="Lịch sử mua hàng"
          subtitle="Xem tất cả đơn hàng đã đặt"
          onPress={() => console.log('Order history')}
        />
        
        <MenuItem
          icon={<Text style={styles.menuIconText}>⭐</Text>}
          title="Đánh giá của tôi"
          subtitle="Quản lý đánh giá sản phẩm"
          onPress={() => console.log('Reviews')}
        />
      </MenuSection>

      <MenuSection title="Hỗ trợ">
        <MenuItem
          icon={<Text style={styles.menuIconText}>❓</Text>}
          title="Trung tâm hỗ trợ"
          subtitle="FAQ, liên hệ, hướng dẫn sử dụng"
          onPress={handleSupport}
        />
      </MenuSection>

      {/* Logout */}
      <View style={styles.logoutSection}>
        <MenuItem
          icon={<Text style={styles.menuIconText}>🚪</Text>}
          title="Đăng xuất"
          onPress={handleLogout}
          showArrow={false}
          destructive
        />
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>Phiên bản 1.0.0</Text>
        <Text style={styles.appCopyright}>© 2025 Chợ Thị Trấn</Text>
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
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8DC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  editButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuItems: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    minHeight: 60,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  destructiveText: {
    color: '#EF4444',
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  logoutSection: {
    marginBottom: 32,
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  appVersion: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  editIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  menuIconText: {
    fontSize: 20,
  },
});