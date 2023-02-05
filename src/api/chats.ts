import axiosInstance from '@/utils/axios';
import {
	ChatDto, CreateChatResponse, CreateChatRequest, Chat,
} from '@/types/chats';

async function getChats(): Promise<ChatDto> {
	const { data } = await axiosInstance.get('chats/getChatsListForUserId');
	return data;
}

async function getChat(chatId: string): Promise<Chat> {
	const { data } = await axiosInstance.get('chats/getChat', {
		params: {
			chatId,
		},
	});
	return data;
}

async function createChat(chatData: CreateChatRequest): Promise<CreateChatResponse> {
	const { data } = await axiosInstance.post('chats/createChat', chatData);
	return data;
}

export default {
	getChat,
	getChats,
	createChat,
};
