import axiosInstance from "@/utils/axios";
import { RegistrationData, AutorizationData, LoginData } from "@/types/auth";
import { AxiosResponse } from "axios";

export function registration(registrationData: RegistrationData): Promise<AxiosResponse<AutorizationData>> {
    return axiosInstance.post('auth/registration', registrationData);
}

export function login(loginData: LoginData): Promise<AxiosResponse<AutorizationData>> {
    return axiosInstance.post('auth/login', loginData);
}

export function refresh(): Promise<AxiosResponse<AutorizationData>> {
    return axiosInstance.post('auth/refresh');
}