import axiosInstance from '@/utils/axios';
import { RegistrationData, AutorizationData, LoginData } from '@/types/auth';
import { AxiosResponse } from 'axios';

async function registration(registrationData: RegistrationData):Promise<AutorizationData> {
	const { data } = await axiosInstance.post('auth/registration', registrationData);
	return data;
}

function login(loginData: LoginData):
Promise<AxiosResponse<AutorizationData>> {
	return axiosInstance.post('auth/login', loginData);
}

async function checkLogin(checkedLogin: string):Promise<boolean> {
	const { data } = await axiosInstance.post('auth/checkLogin', { login: checkedLogin });
	return data.result;
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
	checkLogin,
};
