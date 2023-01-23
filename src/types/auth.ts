interface LoginData {
    login: string,
    password: string
}

interface RegistrationData extends LoginData {
   name: string
}

interface AutorizationData {
    token: string,
    userId: string
}

type LoginFormFields = 'login' | 'password';

type RegistrationFormFields = LoginFormFields | 'name' | 'confirmPassword';

export {
	LoginData,
	RegistrationData,
	AutorizationData,
	RegistrationFormFields,
	LoginFormFields,
};
