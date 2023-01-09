import { Profile } from "./profile";

export interface User extends Profile{
    have_chat: boolean,
    chat_id: null | string,
}