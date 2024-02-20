import React from 'react'
import dayjs from 'dayjs'
import { Avatar, VStack } from 'native-base'
import Pressable from './pressable'
import Text from './text'
import { IMessagesProps } from '~/types/interface'
import { useAuthStore } from '~/stores/AuthStore'
import { useRouter } from 'expo-router'
import { colors } from '~/styles/theme'

type Props = {
  item: IMessagesProps
}

export default function RoomList({ item }: Props) {
  const { user } = useAuthStore()
  const router = useRouter()

  const currentUser = item.expand?.sender?.id === user?.id
  const receiver = item.expand?.receiver
  const sender = item.expand?.sender

  const getAvatarURL = () => {
    const id = currentUser ? receiver?.id : sender?.id
    const avatar = currentUser ? receiver?.avatar : sender?.avatar
    return `https://anonchat.fly.dev/api/files/_pb_users_auth_/${id}/${avatar}`
  }

  return (
    <Pressable
      mx={5}
      py={3}
      flexDir="row"
      alignItems="center"
      justifyContent="flex-start"
      borderBottomWidth={1}
      borderBottomColor={colors.border}
      onPress={() => {
        router.push(`(app)/chat/${currentUser ? receiver?.id : sender?.id}`)
      }}
    >
      <Avatar
        size="md"
        source={{
          uri: getAvatarURL(item),
          cache: 'force-cache',
        }}
      />
      <VStack ml={3} space={0}>
        <Text h4 bold color={colors.black}>
          {currentUser ? receiver?.name : sender?.name}
        </Text>
        <Text h5 color={colors.gray}>
          {currentUser ? 'You: ' : ''}
          {item.text}
        </Text>
      </VStack>
      <Text flex={1} textAlign={'right'} h6 regular color={colors.gray}>
        {dayjs(item.created).format(`D/M/YYYY\nh:mm`)}
      </Text>
    </Pressable>
  )
}
