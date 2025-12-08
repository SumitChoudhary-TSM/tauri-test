import { clientV1 } from '@/api/apiClient';
import { asyncHandler } from '@/utils/asyncHandler';

const AUTH_API = `api/v1/auth`;

export const loginAPI = async (payload: { email: string; password: string }) => {
  const [data, err] = await asyncHandler(clientV1.post(`${AUTH_API}/login`, payload));
  return { data, error: err };
};

export const forgotPasswordAPI = async (payload: { email: string; token?: string }) => {
  const [data, err] = await asyncHandler(clientV1.post(`${AUTH_API}/forgot-password`, payload));
  return { data, error: err };
};

export const verifyOtpAPI = async (payload: { token: string; otp: string }) => {
  const [data, err] = await asyncHandler(clientV1.post(`${AUTH_API}/verify-otp`, payload, { withCredentials: true }));
  return { data, error: err };
};

export const resetPasswordAPI = async (payload: { password: string; token: string }) => {
  const [data, err] = await asyncHandler(
    clientV1.post(`${AUTH_API}/reset-password`, payload, { withCredentials: true }),
  );
  return { data, error: err };
};

export const logoutUserAPI = async () => {
  const [data, err] = await asyncHandler(clientV1.get(`${AUTH_API}/logout`, { withCredentials: true }));
  return { data, error: err };
};

export const refreshTokenAPI = async () => {
  const [data, err] = await asyncHandler(clientV1.get(`${AUTH_API}/refresh`, { withCredentials: true }));
  return { data, error: err };
};
