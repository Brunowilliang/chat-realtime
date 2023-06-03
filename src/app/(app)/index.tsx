import { useFocusEffect, useRouter } from 'expo-router'
import { Avatar, Box, Center, FlatList, VStack } from 'native-base'
import { AddressBook, DotsThree } from 'phosphor-react-native'
import React, { useCallback, useState } from 'react'
import Header from '~/components/header'
import MenuOptions from '~/components/menuOptions'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import { RoomResponse, UsersResponse } from '~/types/types'
import dayjs from 'dayjs'
import FabButton from '~/components/fab'

type Expand = {
  sender: UsersResponse
  receiver: UsersResponse
}

export default function Page() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [data, setData] = useState<RoomResponse<Expand>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getData() {
    setIsLoading(true)
    try {
      const response = await api.collection('room').getFullList(200, {
        sort: '-created',
        expand: 'sender,receiver',
        filter: `sender='${user?.id}' || receiver='${user?.id}'`,
      })
      setData(response as any)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, []),
  )

  const getAvatarURL = (item: RoomResponse<Expand>) => {
    const id =
      item.expand?.sender.id === user?.id
        ? item.expand?.receiver.id
        : item.expand?.sender.id
    const avatar =
      item.expand?.sender.id === user?.id
        ? item.expand?.receiver.avatar
        : item.expand?.sender.avatar

    return `https://anonchat.fly.dev/api/files/_pb_users_auth_/${id}/${avatar}`
  }

  return (
    <>
      <Header
        safeArea
        height={180}
        title="Wellcome"
        subtitle={`${user?.name} 👋🏻`}
        rightComponent={
          <MenuOptions
            Icon={<DotsThree size={30} color={colors.white} />}
            items={[{ name: 'Logout', onPress: () => logout() }]}
          />
        }
      />
      <Box borderTopRadius={20} mt={-8} flex={1} bg={colors.white}>
        <FlatList
          flex={1}
          refreshing={isLoading}
          onRefresh={() => getData()}
          data={data}
          keyExtractor={(item) => item.id}
          _contentContainerStyle={{ pt: 5 }}
          ListHeaderComponent={() => (
            <Box px={5} py={3}>
              <Text bold h2 color={colors.black}>
                Chats
              </Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <Pressable
              mx={5}
              py={3}
              flexDir="row"
              alignItems="center"
              justifyContent="flex-start"
              borderBottomWidth={1}
              borderBottomColor={colors.border}
              onPress={() => {
                const chatUserId =
                  item.expand?.sender.id === user?.id
                    ? item.expand?.receiver.id
                    : item.expand?.sender.id
                router.push(`(app)/chat/${chatUserId}`)
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
                  {item.expand?.sender.name === user?.name
                    ? item.expand?.receiver.name
                    : item.expand?.sender.name}
                </Text>
                <Text h5 color={colors.gray}>
                  {item.expand?.sender.id === user?.id ? 'Você: ' : ''}
                  {item.text}
                </Text>
              </VStack>
              <Text flex={1} textAlign={'right'} h6 regular color={colors.gray}>
                {dayjs(item.created).format(`D/M/YYYY\nh:mm`)}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            isLoading ? (
              <Center flex={1}>
                <Text h5>Loading chats...</Text>
              </Center>
            ) : (
              <Center flex={1}>
                <Text h5>Ooops, no chats found!</Text>
              </Center>
            )
          }
        />
        <FabButton
          icon={<AddressBook size={32} color={colors.black} />}
          onPress={() => router.push(`(app)/contatos`)}
        />
      </Box>
    </>
  )
}
