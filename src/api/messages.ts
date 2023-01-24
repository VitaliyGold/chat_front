import { MessageDto } from '@/types/message';
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

export default {
	getMessages,
};
