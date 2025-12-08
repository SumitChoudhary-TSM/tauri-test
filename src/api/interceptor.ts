import { InternalAxiosRequestConfig } from 'axios';
import { clientV1, docClientV1 } from './apiClient';
import { nanoid } from '@reduxjs/toolkit';
import { dispatch, persistor, store } from '@/redux/store';
import { setIsUserLoggedIn } from '@/redux/reducers/authSlice';
import storage from 'redux-persist/lib/storage';

const setUpInterceptor = () => {
  const logout = async () => {
    dispatch(setIsUserLoggedIn(false));
    dispatch({ type: 'RESET_APP' });
    await persistor.flush();
    clientV1.interceptors.request.eject(clientV1.interceptors.request.use());
    clientV1.interceptors.response.eject(clientV1.interceptors.response.use());

    const persistKeys = [
      'persist:root',
      // Add any other persist keys your app might have
    ];

    // Clear all persist keys
    for (const key of persistKeys) {
      try {
        await storage.removeItem(key);
      } catch (e) {
        console.error(`Failed to remove ${key} from storage:`, e);
      }
    }

    window.location.replace('/login');
  };

  // GET ACCESS TOKEN HERE FROM STATE

  clientV1.interceptors.request.use(
    async (config: InternalAxiosRequestConfig & { withCredentials?: boolean }) => {
      const corelationId = nanoid();
      config.headers['x-correlation-id'] = corelationId;

      if (config.withCredentials !== undefined && config.withCredentials !== false) {
        const currentState = store.getState();
        const currentAccessToken = currentState.auth.accessToken;
        if (currentAccessToken) {
          config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
          config.headers['x-user-id'] = `${corelationId}-getUserIDFromStore`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    },
  );

  docClientV1.interceptors.request.use(
    async (config: InternalAxiosRequestConfig & { withCredentials?: boolean }) => {
      const corelationId = nanoid();
      config.headers['x-correlation-id'] = corelationId;

      if (config.withCredentials !== undefined && config.withCredentials !== false) {
        const currentState = store.getState();
        const currentAccessToken = currentState.auth.accessToken;
        if (currentAccessToken) {
          config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
          config.headers['x-user-id'] = `${corelationId}-getUserIDFromStore`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    },
  );

  clientV1.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        logout();
      }
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    },
  );
};

export default setUpInterceptor;
