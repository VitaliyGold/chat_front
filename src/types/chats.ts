import { CreateChatMessage } from './message';

export interface CreateChatInfoDto {
    members: Array<string>,
    chatType: 1 | 2 | 3,
    startMessage: string
}

export interface CreateChatRequest {
    members: string[],
    chatType: number,
    startMessage: string
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

// хуйню ниже нужно будет посмотреть
export type ChatID = string | null;

export interface ChatDto {
    chatId: string,
    ownerId: string,
    ownerName: string,
    chatType: 1 | 2 | 3
}

export type ChatsList = Map<string, ChatDto>;
