import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

// Attach Authorization header if a token is present:
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = token;
	}

	config.headers["Access-Control-Allow-Origin"] = '*';
	return config;
}, (error) => {
	return Promise.reject(error);
});

// Optionally handle 401s and refresh automatically:
axiosInstance.interceptors.response.use((res) => res, async (error) => {
	// If token is expired, you could automatically refresh here
	// or handle in your code. For now, just reject:
	return Promise.reject(error);
});

export default axiosInstance;
