import React from 'react'
import { Box, Center, FlatList } from 'native-base'
import Header from '~/components/header'
import useGetContacts from '~/hooks/useGetContacts'
import { colors } from '~/styles/theme'
import ContactList from '~/components/contactList'
import Text from '~/components/text'

export default function Page() {
  const { data, isLoading } = useGetContacts()

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
          renderItem={({ item }) => <ContactList item={item} />}
          ListEmptyComponent={
            isLoading ? (
              <Center flex={1}>
                <Text h5>Loading contacts...</Text>
              </Center>
            ) : (
              <Center flex={1}>
                <Text h5>Ooops, no contacts found!</Text>
              </Center>
            )
          }
        />
      </Box>
    </>
  )
}
