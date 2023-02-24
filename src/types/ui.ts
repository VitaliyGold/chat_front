import type { Ref } from 'vue';

export interface CustomError {
    haveError: boolean,
    errorText: string | Ref<string>
}

export type ButtonEmits = {
    (e: 'click'): void
}