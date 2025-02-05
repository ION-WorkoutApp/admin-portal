import axiosInstance from './axiosInstance';

// Login (Check Credentials)
export async function login(email, password) {
	return axiosInstance.post('/auth/checkcredentials', { email, password }, {
		headers: {
			'content-type': 'application/json'
		}
	});
}

// 5. Refresh Token
export async function refreshToken(refreshToken) {
	return axiosInstance.post('/auth/refresh-token', { refreshToken });
}

// 6. Logout (client side)
export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('refreshToken');
}
