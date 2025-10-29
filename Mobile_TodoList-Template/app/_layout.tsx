// app/_layout.tsx
import { Stack } from "expo-router";

// Layout gốc chỉ đơn giản là hiển thị các route con
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
