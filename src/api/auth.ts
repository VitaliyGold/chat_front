import axiosInstance from "@/utils/axios";
import { RegistrationData, AutorizationData } from "@/types/auth";
import { BaseAxiosError } from "@/types/base";

export function registration(registrationData: RegistrationData): Promise<AutorizationData> {
    return axiosInstance.post('auth/registration', registrationData)
}