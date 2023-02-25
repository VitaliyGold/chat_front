<template>
	<div class="alert-container">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured } from 'vue';
import { useRouter } from 'vue-router';

import { AppError } from '@/types/app';
import emitter from '@/utils/emitter';

export default defineComponent({
	name: 'GlobalErrorBoundary',
	setup() {
		const router = useRouter();

		const processingError = (error: AppError) => {
			console.log(error);
			try {
				switch (error.message) {
				case 'auth_error':
					router.push('login');
					break;
				default:
					console.log(error.message);
				}
			} catch (e) {
				console.dir(error);
				router.push('login');
			}
		};

		emitter.on('error', (e) => processingError(e as AppError));

		onErrorCaptured((error) => {
			const appError = error as AppError;
			processingError(appError);

			return false;
		});

		return {
			router,
		};
	},
	errorCaptured(err, vm, info) {
		console.error(err);
		console.log(vm);
		console.log(info);
		return false;
	},
});

</script>

<style scoped lang="less">
.alert-container {
    height: 100%;
}
</style>
