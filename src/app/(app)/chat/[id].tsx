import { useFocusEffect, useSearchParams } from 'expo-router'
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  Input,
  KeyboardAvoidingView,
} from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '~/components/header'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import Toast from '~/components/toast'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { colors, fonts } from '~/styles/theme'
import { Collections, MessagesResponse, UsersResponse } from '~/types/types'
import { PaperPlaneTilt } from 'phosphor-react-native'

type expand = {
  sender: UsersResponse
  receiver: UsersResponse
}

export default function Page() {
  const { user } = useAuthStore()
  const { id } = useSearchParams()

  const [messages, setMessages] = useState<MessagesResponse<expand>[]>([])
  const [receiverData, setReceiverData] = useState<UsersResponse | null>(null)
  const [text, setText] = useState('')
  const [sender] = useState(user?.id)
  const [receiver] = useState(id)
  const [isLoading, setIsLoading] = useState(false)

  const getReceiver = async () => {
    try {
      const data = await api.collection('users').getOne(`${receiver}`)
      setReceiverData(data as any)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMessages = async () => {
    try {
      const data = await api.collection(Collections.Messages).getFullList(200, {
        expand: 'sender,receiver',
        filter: `sender.id='${sender}' && receiver.id='${receiver}' || sender.id='${receiver}' && receiver.id='${sender}'`,
        sort: '-created',
      })
      setMessages(data as any)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async () => {
    try {
      await api.collection(Collections.Messages).create({
        text,
        sender,
        receiver,
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
      getMessages()
    } catch (error) {
      console.log(error)
      Toast({
        message: 'Error',
        description: 'Error deleting message!',
        type: 'danger',
      })
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          await api.collection(Collections.Messages).subscribe('*', (e) => {
            console.log('event', e)
            getMessages()
          })
          console.log('subscribed')
        } catch (error) {
          console.log('error subscribed', error)
        } finally {
          setIsLoading(false)
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

  console.log(
    `https://anonchat.fly.dev/api/files/_pb_users_auth_/${receiverData?.id}/${receiverData?.avatar}`,
  )

  useEffect(() => {
    const fetchData = async () => {
      await getMessages()
      await getReceiver()
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <Header
        back
        height={180}
        leftComponent={
          isLoading ? null : (
            <Avatar
              mr={2}
              size={12}
              source={{
                cache: 'force-cache',
                uri: `https://anonchat.fly.dev/api/files/_pb_users_auth_/${receiverData?.id}/${receiverData?.avatar}`,
              }}
            />
          )
        }
        safeArea
        title={isLoading ? ' ' : 'Chat'}
        subtitle={isLoading ? ' ' : receiverData?.name}
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
            <Pressable
              width={'full'}
              alignItems={item.sender === sender ? 'flex-end' : 'flex-start'}
              onLongPress={() => deleteMessage(item.id)}
            >
              <Text px={2} h6 color={colors.grey600}>
                {item?.expand?.sender?.id === sender
                  ? 'You'
                  : item?.expand?.sender?.name}
              </Text>
              <Box
                py={2.5}
                px={4}
                bg={
                  item.sender === sender
                    ? colors.orangeOpacity
                    : colors.yellowOpacity
                }
                borderRadius={20}
                borderBottomLeftRadius={item.sender === sender ? 20 : 0}
                borderBottomRightRadius={item.sender === sender ? 0 : 20}
              >
                <Text color={colors.black}>{item.text}</Text>
              </Box>
            </Pressable>
          )}
          ListEmptyComponent={
            isLoading ? (
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
        pb={3}
        bg={colors.white}
      >
        <HStack px={5} bg={colors.transparent}>
          <Input
            flex={1}
            fontFamily={fonts.medium}
            fontSize={15}
            allowFontScaling={false}
            borderRadius={30}
            multiline
            maxHeight={120}
            p={5}
            _focus={{
              borderColor: colors.black,
              borderWidth: 1,
              bg: colors.white,
              color: colors.black,
              placeholderTextColor: colors.black,
            }}
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
