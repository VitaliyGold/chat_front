import axiosInstance from '@/utils/axios';
import { RegistrationData, AutorizationData, LoginData } from '@/types/auth';
import { AxiosResponse } from 'axios';

function registration(registrationData: RegistrationData): Promise<AxiosResponse<AutorizationData>> {
  return axiosInstance.post('auth/registration', registrationData);
}

function login(loginData: LoginData): Promise<AxiosResponse<AutorizationData>> {
  return axiosInstance.post('auth/login', loginData);
}

function refresh(): Promise<AxiosResponse<AutorizationData>> {
  return axiosInstance.post('auth/refresh');
}

export default {
  registration,
  login,
  refresh,
};
