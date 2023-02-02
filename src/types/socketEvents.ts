import { MessageDto } from './message';
import { ChatDto } from './chats';

export type SocketEventTypes = 'SEND_MESSAGE' | 'ADD_CHAT';

// нужно как-то нормально переписать на дженерики
export interface SocketEvent {
    type: SocketEventTypes,
    data: MessageDto | ChatDto
}
