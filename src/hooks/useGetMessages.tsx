import { useQuery } from '@tanstack/react-query'
import api from '~/lib/api'
import { IMessagesProps } from '~/types/interface'
import { Collections } from '~/types/types'

export default function useGetMessages(sender: string, receiver: string) {
  return useQuery<IMessagesProps[]>({
    queryKey: ['messages', sender, receiver],
    queryFn: () => getMessages(sender, receiver),
    enabled: !!receiver,
  })
}

async function getMessages(sender: string, receiver: string) {
  try {
    const response = await api
      .collection(Collections.Messages)
      .getFullList(200, {
        expand: 'sender,receiver',
        filter: `sender.id='${sender}' && receiver.id='${receiver}' || sender.id='${receiver}' && receiver.id='${sender}'`,
        sort: '-created',
      })
    return response as any
  } catch (error) {
    console.log(error)
  }
}
