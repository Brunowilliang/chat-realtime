import { Box, Center, VStack, FlatList, Avatar } from 'native-base'
import React from 'react'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import { users } from '~/lib/users'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import { SignIn } from 'phosphor-react-native'
import Header from '~/components/header'

export default function Page() {
  const { login } = useAuthStore()

  return (
    <>
      <Header
        title="Welcome"
        subtitle="to the Login Page"
        safeArea
        height={180}
      />
      <Box
        px={4}
        safeAreaBottom
        borderTopRadius={20}
        mt={-8}
        flex={1}
        bg={colors.white}
      >
        <FlatList
          flex={1}
          data={users}
          keyExtractor={(item) => item.id + ''}
          _contentContainerStyle={{ pt: 5 }}
          ListHeaderComponent={() => (
            <Box py={3}>
              <Text bold h2 color={colors.black}>
                Choose a user to sign in
              </Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <Pressable
              w="full"
              pt={4}
              pb={3}
              rounded={0}
              borderBottomWidth={1}
              borderBottomColor={colors.gray}
              alignItems="center"
              flexDir={'row'}
              onPress={() => login(item.email, item.password)}
            >
              <Avatar
                size="md"
                source={{
                  uri: item.avatar,
                  cache: 'force-cache',
                }}
              />
              <VStack ml={3} flex={1}>
                <Text lineHeight={'sm'} bold>
                  {item.name}
                </Text>
                <Text lineHeight={'sm'}>{item.email}</Text>
              </VStack>

              <SignIn size={20} color={colors.gray} />
            </Pressable>
          )}
        />
        <Center py={3}>
          <Text
            h5
            semibold
            textAlign={'center'}
            color={colors.gray}
          >{`Made with 💙\nby @Brunowgarcia`}</Text>
        </Center>
      </Box>
    </>
  )
}
