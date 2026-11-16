import { use, useEffect } from "react";
import api from "../api";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authoriartzation = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            await axios.post(
              `import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,
              { refreshToken },
            );
            const { token } = response.data;
            console.log(`Refresh time auth token: ${token}`);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (refreshError) {}
        }
      },
    );
  }, []);
};
