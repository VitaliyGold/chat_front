import type { Ref } from 'vue';

export interface CustomError {
    haveError: Boolean,
    errorText: string | Ref<string>
}