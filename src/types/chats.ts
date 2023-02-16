import { CreateChatMessage } from './message';

export interface CreateChatInfoDto {
    members: Array<string>,
    chatType: 1 | 2 | 3,
    startMessage: string
}

export interface ChatMember {
    name: string,
    userId: string
}

export interface CreateChatRequest {
    members: string[],
    chatType: number,
    startMessage: string
}

export interface ChatDto {
    chatId: string,
    ownerId: string,
    ownerName: string,
    chatType: 1 | 2 | 3,
    members: ChatMember[]
}
export interface CreateChatResponse extends ChatDto {
    firstMessage: CreateChatMessage
}

// хуйню ниже нужно будет посмотреть
export type ChatID = string | null;

export interface Chat extends ChatDto{
    endMessageList: boolean,
}

export type ChatsList = Record<string, Chat>;
