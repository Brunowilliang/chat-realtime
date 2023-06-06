import { useQuery } from '@tanstack/react-query'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { IUserProps } from '~/types/interface'
import { Collections } from '~/types/types'

export default function useGetContacts() {
  const { user } = useAuthStore()

  return useQuery<IUserProps[]>({
    queryKey: ['receiver', user?.id],
    queryFn: () => getContacts(user?.id as string),
  })
}

async function getContacts(id: string) {
  try {
    const response = await api.collection(Collections.Users).getFullList(200, {
      sort: '-created',
      filter: `id!='${id}'`,
    })
    return response as any
  } catch (error) {
    console.log(error)
  }
}
