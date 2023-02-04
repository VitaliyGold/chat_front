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

export interface Message extends CreateChatMessage{
    name: string
}

export interface MessageDto extends Message{
    status: MessageStatus,
    createdAt: string
}

export type TempMessageList = Map<string, MessageDto>;

export type MessageList = MessageDto[];

export type ChatsMessageList<T> = Map<string, T>
