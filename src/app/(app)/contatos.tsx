import { useRouter } from 'expo-router'
import { VStack, Avatar, Box, FlatList } from 'native-base'
import { PaperPlaneTilt } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import Header from '~/components/header'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import { UsersResponse } from '~/types/types'

export default function Page() {
  const router = useRouter()
  const { user } = useAuthStore()

  const [data, setData] = useState<UsersResponse[]>([])

  async function getData() {
    try {
      const response = await api.collection('users').getFullList(200, {
        sort: '-created',
        filter: `id!='${user?.id}'`,
      })
      setData(response as any)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Header
        back
        safeArea
        height={180}
        title="Select"
        subtitle="a user to chat"
      />
      <Box borderTopRadius={20} mt={-8} flex={1} bg={colors.white}>
        <FlatList
          flex={1}
          data={data}
          keyExtractor={(item, index) => index.toString()}
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
                router.push(`(app)/chat/${item.id}`)
              }}
            >
              <Avatar
                size="md"
                source={{
                  uri: `https://anonchat.fly.dev/api/files/_pb_users_auth_/${item.id}/${item.avatar}`,
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
          )}
        />
      </Box>
    </>
  )
}
