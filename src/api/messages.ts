import { CreateNewMessage, MessageDto } from '@/types/message';
import axiosInstance from '@/utils/axios';

async function getMessages(chatId: string, page = 0): Promise<MessageDto[]> {
	const { data } = await axiosInstance.get('messages/getListMessages', {
		params: {
			chatId,
			page,
		},
	});
	return data;
}

async function sendMessage(message: CreateNewMessage): Promise<MessageDto> {
	const { data } = await axiosInstance.post('messages/sendMessage', message);
	return data;
}

export default {
	getMessages,
	sendMessage,
};
