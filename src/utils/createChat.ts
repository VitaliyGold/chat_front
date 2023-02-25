import { Chat, ChatDto, CreateTempChatConfig } from '@/types/chats';

export const getChatModel = ({
	members, chatId, ownerId, chatType, ownerName,
} : ChatDto) : Chat => ({
	members,
	chatId,
	ownerId,
	chatType,
	ownerName,
	endMessageList: true,
});
