import { useQuery } from '@tanstack/react-query'
import api from '~/lib/api'
import { IRoomProps } from '~/types/interface'

export default function useRooms(id: string) {
  return useQuery<IRoomProps[]>({
    queryKey: ['rooms', id],
    queryFn: () => getRooms(id),
  })
}

async function getRooms(id: string) {
  try {
    const response = await api.collection('room').getFullList(200, {
      sort: '-created',
      expand: 'sender,receiver',
      filter: `sender='${id}' || receiver='${id}'`,
    })

    return response as any
  } catch (error) {
    console.log(error)
  }
}
