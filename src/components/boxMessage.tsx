import React from 'react'
import { Box } from 'native-base'
import Pressable from './pressable'
import Text from './text'
import { colors } from '~/styles/theme'
import { useAuthStore } from '~/stores/AuthStore'
import { IMessagesProps } from '~/types/interface'

type Props = {
  item: IMessagesProps
  deleteMessage: (id: string) => void
}

export default function BoxMessage({ item, deleteMessage }: Props) {
  const { user } = useAuthStore()
  const currentUser = item?.expand?.sender?.id === user?.id

  return (
    <Pressable
      position="relative"
      disabled={!currentUser}
      alignItems={currentUser ? 'flex-end' : 'flex-start'}
      onLongPress={() => deleteMessage(item.id)}
    >
      <Text px={2} h6 color={colors.grey600}>
        {currentUser ? 'You' : item?.expand?.sender?.name}
      </Text>
      <Box
        py={2.5}
        px={4}
        bg={currentUser ? colors.orangeOpacity : colors.yellowOpacity}
        borderRadius={20}
        borderBottomLeftRadius={currentUser ? 20 : 0}
        borderBottomRightRadius={currentUser ? 0 : 20}
      >
        <Text color={colors.black}>{item.text}</Text>
      </Box>
    </Pressable>
  )
}
