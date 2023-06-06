import { useQuery } from '@tanstack/react-query'
import api from '~/lib/api'
import { IUserProps } from '~/types/interface'
import { Collections } from '~/types/types'

export default function useGetUser(id: string) {
  return useQuery<IUserProps>({
    queryKey: ['receiver', id],
    queryFn: () => getUser(id),
  })
}

async function getUser(id: string) {
  try {
    const response = await api.collection(Collections.Users).getOne(`${id}`)
    return response as any
  } catch (error) {
    console.log(error)
  }
}
