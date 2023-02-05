// to backend
export interface CreateNewMessage {
    messageType: 1 | 2 | 3,
    messageText: string,
    chatId: string,
}

// from backend
export interface CreateChatMessage {
    messageId: string,
    messageText: string,
    createdAt: string,
    ownerId: string,
    chatId: string
}

export type MessageStatus = 'loading' | 'delivered' | 'read'

export interface MessageDto extends CreateChatMessage {
    name: string,
    status: MessageStatus,
    createdAt: string
}

export type Message = MessageDto

export type TempMessageList = Map<string, Message>;

export type MessageList = Message[];

export type ChatsMessageList<T> = Map<string, T>
