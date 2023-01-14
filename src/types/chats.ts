import { CreateChatMessage } from './message';

export interface CreateChatInfoDto {
    members: Array<string>,
    chat_type: 1 | 2 | 3,
    start_message: string
}

export interface CreateChatRequest {
    members: string[],
    chat_type: number,
    start_message: string
}


interface ChatMember {
    name: string,
    userId: string
}

export interface CreateChatResponse {
    chatId: string,
    ownerId: string,
    createdAt: string,
    members: ChatMember[]
    firstMessage: CreateChatMessage
}

export type ChatsList = Map<string, ChatDto>;

// хуйню ниже нужно будет посмотреть
export type Chat_ID = string | null;

export interface ChatDto {
    chat_id: string,
    owner_id: string,
    owner_name: string,
    chat_type: 1 | 2 | 3
}