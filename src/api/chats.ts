import axiosInstance from '@/utils/axios';
import { ChatDto, CreateChatResponse, CreateChatRequest } from '@/types/chats';


export async function getChats(): Promise<ChatDto> {
    const { data } = await axiosInstance.get('chats/getChatsListForUserId');
    return data;
}


export async function createChat(chatData: CreateChatRequest): Promise<CreateChatResponse> {
    const { data } = await axiosInstance.post('chats/createChat', chatData);
    return data;
}