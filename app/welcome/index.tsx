import { useAuth } from '@/lib/context/AuthContext'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function WelcomeScreen() {
  const { user } = useAuth()

  // If user is already logged in, redirect to tabs
  React.useEffect(() => {
    if (user) {
      router.replace('/(tabs)')
    }
  }, [user])

  const handleRegister = () => {
    router.push('/register' as any)
  }

  const handleLogin = () => {
    router.push('/login' as any)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>SMTOWN</Text>
        <Text style={styles.subtitle}>Chợ trực tuyến Ngọc Hồi</Text>
        <Text style={styles.description}>
          Nơi mua bán, trao đổi hàng hóa an toàn và tiện lợi trong cộng đồng
        </Text>
      </View>

      <View style={styles.features}>
        <FeatureItem 
          icon="🛒" 
          title="Mua bán dễ dàng" 
          description="Đăng tin và tìm kiếm sản phẩm chỉ với vài cú chạm"
        />
        <FeatureItem 
          icon="💬" 
          title="Nhắn tin trực tiếp" 
          description="Chat với người bán/mua ngay trong ứng dụng"
        />
        <FeatureItem 
          icon="⭐" 
          title="Đánh giá uy tín" 
          description="Hệ thống đánh giá giúp bạn mua bán an toàn"
        />
        <FeatureItem 
          icon="📍" 
          title="Gần bạn" 
          description="Tìm kiếm sản phẩm xung quanh khu vực Ngọc Hồi"
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleRegister}
        >
          <Text style={styles.primaryButtonText}>Đăng ký miễn phí</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.secondaryButtonText}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.browseButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.browseButtonText}>Xem sản phẩm không cần đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
  browseButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  browseButtonText: {
    color: '#6B7280',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
})