import axios from 'axios';

const BASE_URL = "https://test.ion606.com";

const axiosInstance = axios.create({
	baseURL: BASE_URL
});

// Attach Authorization header if a token is present:
axiosInstance.interceptors.request.use((config) => {
	console.log(`Request: ${config.method.toUpperCase()} ${config.url} || ${BASE_URL}`);
	
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
