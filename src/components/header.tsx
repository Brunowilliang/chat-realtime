import React from 'react'
import { Box, IBoxProps } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import Text from '~/components/text'
import { colors } from '~/styles/theme'
import Pressable from './pressable'
import { useRouter } from 'expo-router'

interface Props extends IBoxProps {
  back?: boolean
  onBack?: () => void
  title?: string
  subtitle?: string
  rightComponent?: React.ReactNode
  leftComponent?: React.ReactNode
  color?: string
}

const Header = ({
  back,
  title,
  subtitle,
  rightComponent,
  leftComponent,
  color,
  ...rest
}: Props) => {
  const router = useRouter()

  return (
    <Box
      bg={colors.black}
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p={5}
      {...rest}
    >
      {back && (
        <Pressable onPress={router.back} pr={4}>
          <CaretLeft size={26} weight="bold" color={color || colors.white} />
        </Pressable>
      )}

      {leftComponent && <Box>{leftComponent}</Box>}

      <Box flex={1}>
        {title && (
          <Text h2 medium color={color || colors.white}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text h2 bold mt={-1} color={color || colors.white}>
            {subtitle}
          </Text>
        )}
      </Box>

      {rightComponent && <Box>{rightComponent}</Box>}
    </Box>
  )
}

export default Header
