import { Profile } from './profile';

export interface User extends Profile {
    haveChat: boolean,
    chatId: null | string,
}
