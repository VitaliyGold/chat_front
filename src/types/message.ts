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
}

export type MessagesEntries = [string, MessageDto][]

export type MessageList = Map<string, MessageDto>;

export type ChatsMessageList = Map<string, MessageList>
