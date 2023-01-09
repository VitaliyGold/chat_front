import { Profile } from "@/types/profile";
import axiosInstance from "@/utils/axios";

export async function getProfile(): Promise<Profile> {
    const { data } = await axiosInstance.get('profile/getUserProfile');
    return data;
}