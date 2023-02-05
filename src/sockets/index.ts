import { MessageDto } from '@/types/message';
import { SocketEvent } from '@/types/socketEvents';
import useMessages from '@/store/messages';
import emitter from '@/utils/emitter';

class WebSocketConnect {
	private socket: WebSocket | null;

	private token: string;

	constructor(token: string) {
		this.socket = null;
		this.token = token;
	}

	connect() {
		const connectString = `${'ws://localhost:5000/ws?' + 'authorization=Bearer '}${this.token}`;

		try {
			this.socket = new WebSocket(connectString);
			setTimeout(() => this.subscribeEvents.call(this), 100);
		} catch (e) {
			console.log(e);
		}
	}

	subscribeEvents() {
		if (this.socket) {
			console.log('Подписался');
			this.socket.onmessage = (wsEvent: MessageEvent) => {
				const event: SocketEvent = JSON.parse(wsEvent.data);
				switch (event.type) {
				case 'SEND_MESSAGE':
					const message = event.data as MessageDto;
					this.addMessage(message);
					emitter.emit('getMessage');
					break;
				case 'ADD_CHAT':
					console.log('добавить чат');
					break;
				default:
					console.log(event.type);
				}
			};
		}
	}

	addMessage(message: MessageDto) {
		const messagesStore = useMessages();
		messagesStore.addMessageToChat(message.chatId, message);
	}
}

export default WebSocketConnect;
