import React from 'react'
import { Avatar, Box, VStack } from 'native-base'
import Pressable from './pressable'
import Text from './text'
import { IUserProps } from '~/types/interface'
import { useRouter } from 'expo-router'
import { colors } from '~/styles/theme'
import { PaperPlaneTilt } from 'phosphor-react-native'

type Props = {
  item: IUserProps
}

export default function ContactList({ item }: Props) {
  const router = useRouter()

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
        router.push(`(app)/chat/${item.id}`)
      }}
    >
      <Avatar
        size="md"
        source={{
          uri: `https://anonchat.fly.dev/api/files/_pb_users_auth_/${item?.id}/${item?.avatar}`,
          cache: 'force-cache',
        }}
      />
      <VStack ml={3} space={0}>
        <Text h4 bold color={colors.black}>
          {item.name}
        </Text>
        <Text h5 color={colors.gray}>
          {item.status}
        </Text>
      </VStack>

      <Box ml="auto" mr={3}>
        <PaperPlaneTilt size={22} color={colors.black} />
      </Box>
    </Pressable>
  )
}
