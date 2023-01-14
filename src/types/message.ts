export interface Message extends CreateChatMessage{
    chatId: string,
}

export interface CreateChatMessage {
    messageId: string,
    messageText: string,
    createdAt: string,
    ownerId: string,
    ownerName: string
}

export interface MessageDto extends Message{
    status: MessageStatus,
}

export type MessageList = Map<string, MessageDto>;

export type ChatsMessageList = Map<string, MessageList>

export type MessageStatus = 'loading' | 'delivered' | 'read'