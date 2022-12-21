import axiosInstance from "@/utils/axios";
import { RegistrationData, AutorizationData, LoginData } from "@/types/auth";

export function registration(registrationData: RegistrationData): Promise<AutorizationData> {
    return axiosInstance.post('auth/registration', registrationData);
}

export function login(loginData: LoginData) {
    return axiosInstance.post('auth/login', loginData);
}