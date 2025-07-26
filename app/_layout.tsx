import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/lib/context/AuthContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome/index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="post/[id]" options={{ headerShown: true, title: 'Chi tiết sản phẩm' }} />
        <Stack.Screen name="post/create" options={{ headerShown: true, title: 'Đăng tin mới' }} />
        <Stack.Screen name="user/[id]" options={{ headerShown: true, title: 'Hồ sơ người dùng' }} />
        <Stack.Screen name="chat/[conversationId]" options={{ headerShown: true, title: 'Nhắn tin' }} />
        <Stack.Screen name="checkout/index" />
        <Stack.Screen name="product-detail/index" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}