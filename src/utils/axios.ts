import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
    validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
})
export default axiosInstance;