import { MessageDto } from '@/types/message';
import { SocketEvent } from '@/types/socketEvents';
import useMessages from '@/store/messages';

class WebSocketConnect {
    private socket: WebSocket | null;

    private token: string;

    constructor(token: string) {
    	this.socket = null;
    	this.token = token;
    }

    connect() {
    	try {
    		this.socket = new WebSocket(`${'ws://localhost:5000/ws?' + 'authorization=Bearer '}${this.token}`);
    		console.log(111);
    		setTimeout(() => this.subscribeEvents.call(this), 100);
    	} catch (e) {
    		console.log(e);
    	}
    }

    subscribeEvents() {
    	if (this.socket) {
    		console.log('Подписался');
    		this.socket.onmessage = (message: MessageEvent) => {
    			const event: SocketEvent = JSON.parse(message.data);
    			switch (event.type) {
    			case 'SEND_MESSAGE':
    				const message = event.data as MessageDto;
    				this.addMessage(message);
    				break;
    			case 'ADD_CHAT':
    				break;
    				// делаю что-то с чатом
    			default:
    				console.log(event.type);
    			}
    		};
    	}
    }

    addMessage(message: MessageDto) {
    	const messagesStore = useMessages();
    	messagesStore.addMessageToChat(message.chatId, message.messageId, message);
    }
}

export default WebSocketConnect;
