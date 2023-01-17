import axiosInstance from '@/utils/axios';

export async function getMessages(chatId: string, page = 0): Promise<> {
    const { data } = await axiosInstance.get('messages/getListMessages', {
        params: {
            chat_id: chatId,
            page
        }
    });
    return data;
}