import { useFocusEffect, useSearchParams } from 'expo-router'
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  KeyboardAvoidingView,
} from 'native-base'
import React, { useCallback, useState } from 'react'
import Header from '~/components/header'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import Toast from '~/components/toast'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import { Collections } from '~/types/types'
import { PaperPlaneTilt } from 'phosphor-react-native'
import BoxMessage from '~/components/boxMessage'
import useGetMessages from '~/hooks/useGetMessages'
import useGetUser from '~/hooks/useGetUser'
import Input from '~/components/input'

export default function Page() {
  const { user } = useAuthStore()
  const { id: receiverId } = useSearchParams()
  const [text, setText] = useState('')

  const {
    data: receiver,
    isLoading: isLoadingReceiver,
    // refetch: refetchReceiver,
  } = useGetUser(receiverId as string)

  const {
    data: messages,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useGetMessages(user?.id as string, receiver?.id as string)

  const sendMessage = async () => {
    try {
      await api.collection(Collections.Messages).create({
        text,
        sender: user?.id,
        receiver: receiver?.id,
      })
      setText('')
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      await api.collection(Collections.Messages).delete(id)
      Toast({
        message: 'Success',
        description: 'Message deleted successfully!',
        type: 'success',
      })
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          await api.collection(Collections.Messages).subscribe('*', (e) => {
            console.log('event', e)
            refetchMessages()
          })
          console.log('subscribed')
        } catch (error) {
          console.log('error subscribed', error)
        }
      }

      fetchData()

      return async () => {
        try {
          await api.collection(Collections.Messages).unsubscribe('*')
          console.log('unsubscribed')
        } catch (error) {
          console.log('error unsubscribed', error)
        }
      }
    }, []),
  )

  return (
    <>
      <Header
        back
        safeArea
        height={180}
        title={'Chat'}
        subtitle={receiver?.name}
        leftComponent={
          isLoadingReceiver ? null : (
            <Avatar
              mr={2}
              size={12}
              source={{
                cache: 'force-cache',
                uri: `https://anonchat.fly.dev/api/files/_pb_users_auth_/${receiver?.id}/${receiver?.avatar}`,
              }}
            />
          )
        }
      />
      <Box borderTopRadius={20} mt={-8} flex={1} bg={colors.white}>
        <FlatList
          data={messages}
          inverted
          tintColor={colors.primary}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Box h={2} />}
          _contentContainerStyle={{ p: 5 }}
          renderItem={({ item }) => (
            <BoxMessage
              item={item}
              deleteMessage={() => deleteMessage(item.id)}
            />
          )}
          ListEmptyComponent={
            isLoadingMessages ? (
              <Center flex={1}>
                <Text h5>Loading messages...</Text>
              </Center>
            ) : (
              <Center flex={1}>
                <Text h5>Ooops, no messages found</Text>
                <Text h5>Say hi to your friend!</Text>
              </Center>
            )
          }
        />
      </Box>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        bg={colors.transparent}
      >
        <HStack px={5} bg={colors.white}>
          <Input
            value={text}
            onChangeText={(value) => setText(value)}
            placeholder="Type a message..."
            InputRightElement={
              text !== '' &&
              ((
                <Pressable
                  bg={colors.yellow}
                  rounded="full"
                  mr={3}
                  p={2.5}
                  onPress={sendMessage}
                >
                  <PaperPlaneTilt size={20} color={colors.black} />
                </Pressable>
              ) as any)
            }
          />
        </HStack>
      </KeyboardAvoidingView>
      <Box safeAreaBottom bg={colors.white} />
    </>
  )
}
