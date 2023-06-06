import { MessagesResponse, RoomResponse, UsersResponse } from './types'

type expand = {
  sender: UsersResponse
  receiver: UsersResponse
}

export type IUserProps = UsersResponse
export type IRoomProps = RoomResponse<expand>
export type IMessagesProps = MessagesResponse<expand>
