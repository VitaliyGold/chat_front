export interface CreateChatInfoDto {
    members: Array<string>,
    chat_type: 1 | 2 | 3,
    start_message: string
}

export interface ChatsList {
    [key: string] : ChatDto
}

export type Chat_ID = string | null;

export interface ChatDto {
    chat_id: string,
    owner_id: string,
    owner_name: string,
    chat_type: 1 | 2 | 3
}