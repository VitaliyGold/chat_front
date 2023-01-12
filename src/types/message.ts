export interface Message {
    message_id: String,
    message_text: String,
    createdAt: String,
    chat_id: String,
    owner_id: String,
    owner_name: String
}

export interface MessageDto extends Message{
    status: MessageStatus,

}

export type MessageStatus = 'loading' | 'delivered' | 'read'