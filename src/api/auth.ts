import axiosInstance from '@/utils/axios';
import { RegistrationData, AutorizationData, LoginData } from '@/types/auth';
import { AxiosResponse } from 'axios';

function registration(registrationData: RegistrationData):
Promise<AxiosResponse<AutorizationData>> {
	return axiosInstance.post('auth/registration', registrationData);
}

function login(loginData: LoginData):
Promise<AxiosResponse<AutorizationData>> {
	return axiosInstance.post('auth/login', loginData);
}

function checkLogin(login: string)
:Promise<AxiosResponse<boolean>> {
	return axiosInstance.post('auth/checkLogin');
}

function refresh():
Promise<AxiosResponse<AutorizationData>> {
	return axiosInstance.post('auth/refresh');
}

function logout():
Promise<AxiosResponse<boolean>> {
	return axiosInstance.post('auth/logout');
}

export default {
	registration,
	login,
	refresh,
	logout,
};
