import React from 'react'
import { Box, Divider, Menu } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { colors } from '~/styles/theme'
import Text from './text'

type Props = {
  iconName?: string
  iconColor?: string
  iconSize?: number
  Icon?: React.ReactNode
  items?: Array<{
    name?: string
    onPress?: () => void
  }>
}

const MenuOptions = ({ Icon, items }: Props) => {
  return (
    <Menu
      p={0}
      overflow="hidden"
      rounded="8px"
      bg={colors.white}
      placement={'bottom right'}
      _backdrop={{ backgroundColor: colors.black, opacity: 0.6 }}
      trigger={(triggerProps) => {
        return <TouchableOpacity {...triggerProps}>{Icon}</TouchableOpacity>
      }}
    >
      {items?.map(({ name, onPress }, index) => {
        return (
          <Box key={index}>
            <Menu.Item
              flex={1}
              onPress={onPress}
              pl={3}
              pr={5}
              py={4}
              _pressed={{ bgColor: colors.yellowOpacity }}
            >
              <Text h4 semibold>
                {name}
              </Text>
            </Menu.Item>
            {index < items.length - 1 && <Divider bg={colors.grey400} />}
          </Box>
        )
      })}
    </Menu>
  )
}

export default MenuOptions
