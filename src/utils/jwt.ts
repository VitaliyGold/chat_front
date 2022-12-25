export function setJwtToken(token: string) {
    localStorage.setItem('auth_token', token);
}

export function setUserId(user_id: string) {
    localStorage.setItem('user_id', user_id);
}

export function getJwtToken() {
    return localStorage.getItem('auth_token')
}

export function getUserId() {
    localStorage.get('user_id');
}