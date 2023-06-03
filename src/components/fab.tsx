import { Fab, IFabProps } from 'native-base'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~/styles/theme'

const FabButton = (p: IFabProps) => {
  const { bottom } = useSafeAreaInsets()
  return (
    <Fab
      bg={colors.yellow}
      _pressed={{ opacity: 0.5 }}
      renderInPortal={false}
      right={5}
      p={4}
      bottom={bottom + 10}
      shadow={2}
      size="lg"
      {...p}
    />
  )
}

export default FabButton
