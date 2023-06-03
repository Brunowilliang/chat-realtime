import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
  return (
    <>
      <StatusBar style="light" translucent />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="contatos" options={{ animation: 'fade' }} />
        <Stack.Screen name="chat/[id]" options={{ animation: 'fade' }} />
      </Stack>
    </>
  )
}
