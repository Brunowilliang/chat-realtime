/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Messages = "messages",
	Room = "room",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type MessagesRecord = {
	text?: string
	sender?: RecordIdString
	receiver?: RecordIdString
}

export type RoomRecord = {
	text?: string
	sender?: RecordIdString
	receiver?: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
	status?: string
	online?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type RoomResponse<Texpand = unknown> = Required<RoomRecord> & BaseSystemFields<Texpand>
export type UsersResponse = Required<UsersRecord> & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	messages: MessagesRecord
	room: RoomRecord
	users: UsersRecord
}

export type CollectionResponses = {
	messages: MessagesResponse
	room: RoomResponse
	users: UsersResponse
}