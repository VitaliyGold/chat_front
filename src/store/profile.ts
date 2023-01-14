import { Profile } from "@/types/profile";
import { defineStore } from "pinia";

const useProfile = defineStore('profile', {
    state: () => ({
        user_profile: {} as Profile
    }),
    actions: {
        fillUserProfile(user_data: Profile) {
            this.user_profile = user_data;
        }
    }
});

export default useProfile;