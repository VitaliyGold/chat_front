export function setJwtToken(token: string) {
	localStorage.setItem('auth_token', token);
}

export function setUserId(userId: string) {
	localStorage.setItem('user_id', userId);
}

export function getJwtToken() {
	return localStorage.getItem('auth_token');
}

export function getUserId() {
	localStorage.get('user_id');
}
