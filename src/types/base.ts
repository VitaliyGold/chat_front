import type { AxiosError } from 'axios';

interface BaseAxiosError extends AxiosError {
    statusCode: number,
    message: string,
    error: string
}

export {
	BaseAxiosError,
};
