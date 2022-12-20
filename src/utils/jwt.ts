export function setJwtToken(token: string) {
    localStorage.set('auth_token', token);
}

export function setUserId(user_id: string) {
    localStorage.set('user_id', user_id);
}

export function getJwtToken() {
    return localStorage.getItem('auth_token')
}

export function getUserId() {
    localStorage.get('user_id');
}