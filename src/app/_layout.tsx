import { Slot } from 'expo-router'
import { NativeBaseProvider, StatusBar } from 'native-base'
import { Text } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { AuthProvider } from '~/hooks/authProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NativeBaseConfig, NativeBaseTheme } from '~/styles/nativeBaseTheme'

export default function Layout() {
  // @ts-ignore
  if (Text.defaultProps == null) {
    // @ts-ignore
    Text.defaultProps = {}
    // @ts-ignore
    Text.defaultProps.allowFontScaling = false
  }

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NativeBaseProvider config={NativeBaseConfig} theme={NativeBaseTheme}>
            <FlashMessage position="top" />
            <StatusBar barStyle="default" translucent animated />
            <Slot />
          </NativeBaseProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}
