// в последствии можно будет бахнуть сюда дженерик для левых пользователей и для своей учетки
// или для заблокированных пользователей
export interface Profile {
    name: string,
    userLink: string,
    avatarLink: string,
    userId: string,
    userDescription: string,
    chatId: string | null,
    haveChat: boolean,
    isOwnProfile: boolean
}

export type ProfilesList = Record<string, Profile>
