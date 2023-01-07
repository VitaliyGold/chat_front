import axiosInstance from "@/utils/axios";
import { ChatDto } from "@/types/chats";


export function getChats(): Promise<ChatDto> {
    return axiosInstance.get('chats/getChatsListForUserId')
}