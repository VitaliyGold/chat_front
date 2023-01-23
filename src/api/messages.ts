import axiosInstance from '@/utils/axios';
import { AxiosResponse } from 'axios';

async function getMessages(chatId: string, page = 0): Promise<AxiosResponse> {
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
