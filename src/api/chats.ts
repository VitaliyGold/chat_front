import axiosInstance from '@/utils/axios';
import { ChatDto, CreateChatResponse, CreateChatRequest } from '@/types/chats';

async function getChats(): Promise<ChatDto> {
	const { data } = await axiosInstance.get('chats/getChatsListForUserId');
	return data;
}

async function createChat(chatData: CreateChatRequest): Promise<CreateChatResponse> {
	const { data } = await axiosInstance.post('chats/createChat', chatData);
	return data;
}

export default {
	getChats,
	createChat,
};
