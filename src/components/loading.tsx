import React from 'react'
import { Center, Spinner } from 'native-base'
import { colors } from '~/styles/theme'

type Props = {
  loading: boolean
}

const Loading = ({ loading }: Props) =>
  loading ? (
    <Center
      bg={colors.blackOpacity}
      zIndex={99}
      position="absolute"
      top={0}
      left={0}
      w="full"
      h="full"
    >
      <Spinner mt={10} size="lg" color={colors.white} />
    </Center>
  ) : null

export default Loading
