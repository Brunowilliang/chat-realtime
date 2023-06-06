import { useRouter } from 'expo-router'
import { Box, Center, FlatList } from 'native-base'
import { AddressBook, DotsThree } from 'phosphor-react-native'
import React from 'react'
import Header from '~/components/header'
import MenuOptions from '~/components/menuOptions'
import Text from '~/components/text'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import FabButton from '~/components/fab'
import { useFocusRefetch } from '~/hooks/useFocusRefetch'
import useRooms from '~/hooks/useRooms'
import RoomList from '~/components/roomList'

export default function Page() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { data, isLoading, refetch } = useRooms(user?.id as string)

  useFocusRefetch(refetch)

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
          onRefresh={() => refetch()}
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
          renderItem={({ item }) => <RoomList item={item} />}
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
