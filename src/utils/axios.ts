import axios from "axios";
import { refresh } from "@/api/auth";
import { getJwtToken, setJwtToken } from "./jwt";


let retryInterseptor = false;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    },
    headers: {
      Authorization: 'Bearer ' + getJwtToken()
    }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token && config.headers) {
      config.headers["Authorization"] = 'Bearer ' + token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    retryInterseptor = false;
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !retryInterseptor) {
      retryInterseptor = true;

      try {
        const rs = await refresh();

        const { token } = rs.data;
        setJwtToken(token);

        return axiosInstance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  }
);




export default axiosInstance;