interface RegistrationData {
    login: string,
    name: string,
    password: string
}


interface AutorizationData {
    token: string,
    user_id: string
}


export {
    RegistrationData,
    AutorizationData
}