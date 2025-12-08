import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  forgotPasswordAPI,
  loginAPI,
  logoutUserAPI,
  refreshTokenAPI,
  resetPasswordAPI,
  verifyOtpAPI,
} from '../services/authAPI';
import { RoleType } from '@/styles/navbar/types';
import { UserRoleOptions } from '@/constants/options';

export interface UserData {
  email?: string;
  is_active?: boolean;
  phone?: string;
  role_id: number;
  updated_at?: string;
  updated_by?: number | null;
  user_id: number;
  user_name: string;
  role?: RoleType;
  profile_image?: string | null;
}

interface AuthState {
  loading: boolean;
  user: UserData;
  error: string | null;
  token: string | null;
  forgotPasswordSuccess: boolean;
  otpVerified: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordToken: string | null;
  forgotPasswordEmail: string | null;
  isUserLoggedIn: boolean;
  isUserVerified: boolean;
  accessToken?: string;
}

export const initialState: AuthState = {
  loading: false,
  user: {
    email: '',
    is_active: false,
    phone: '',
    role_id: 0,
    role: UserRoleOptions.MARKS_PRINT_ADMIN,
    updated_at: '',
    updated_by: null,
    user_id: 0,
    user_name: '',
  },
  error: null,
  token: null,
  forgotPasswordSuccess: false,
  otpVerified: false,
  resetPasswordSuccess: false,
  resetPasswordToken: null,
  forgotPasswordEmail: null,
  isUserLoggedIn: false,
  isUserVerified: true,
  accessToken: undefined,
};

// LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await loginAPI({ email, password });
      if (response?.error) return thunkAPI.rejectWithValue(response?.error);
      return response?.data?.data?.data;
    } catch {
      return thunkAPI.rejectWithValue('Login failed');
    }
  },
);

// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, token }: { email: string; token?: string }, thunkAPI) => {
    try {
      const response = await forgotPasswordAPI({ email, token }); // token is optional now
      if (response?.error) return thunkAPI.rejectWithValue(response.error);
      return response?.data?.data?.data;
    } catch {
      return thunkAPI.rejectWithValue('Failed to send OTP');
    }
  },
);

// OTP VERIFICATION
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ token, otp }: { token: string; otp: string }, thunkAPI) => {
    try {
      const response = await verifyOtpAPI({ token, otp });
      if (response?.error) return thunkAPI.rejectWithValue(response.error);
      return response?.data?.data?.data;
    } catch {
      return thunkAPI.rejectWithValue('One Time Password verification failed');
    }
  },
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ password, token }: { password: string; token: string }, thunkAPI) => {
    try {
      const response = await resetPasswordAPI({ password, token });
      if (response?.error) {
        return thunkAPI.rejectWithValue({ error: response.error });
      }
      return response;
    } catch (error) {
      let errorMessage = 'Reset password failed';
      if (error && typeof error === 'object' && 'response' in error) {
        const response = error.response;
        if (response && typeof response === 'object' && 'data' in response) {
          const data = response.data;
          if (data && typeof data === 'object' && 'error' in data) {
            errorMessage = data.error as string;
          }
        }
      }
      return thunkAPI.rejectWithValue({ error: errorMessage });
    }
  },
);

// PROFILE UPDATE
// export const updateUserProfile = createAsyncThunk(
//   'auth/updateProfile',
//   async (payload: UpdateUserProfileModal, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState() as { auth: AuthState };
//       const updatedPayload = {
//         ...payload,
//         user_id: state.auth.user.user_id,
//       };
//       const response = await updateUserProfileAPI(updatedPayload);
//       if (response?.error) return thunkAPI.rejectWithValue(response.error);
//       return response?.data?.data?.data;
//     } catch {
//       return thunkAPI.rejectWithValue('Reset password failed');
//     }
//   },
// );

// LOGOUT
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await logoutUserAPI();
    if (response?.error) return thunkAPI.rejectWithValue(response.error);
    return response?.data?.data?.data;
  } catch {
    return thunkAPI.rejectWithValue('Reset password failed');
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const response = await refreshTokenAPI();
    if (response?.error) return thunkAPI.rejectWithValue(response.error);
    return response?.data?.data?.data;
  } catch {
    return thunkAPI.rejectWithValue('Refresh token failed');
  }
});

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setIsUserVerified: (state, action: PayloadAction<boolean>) => {
      state.isUserVerified = action.payload;
    },
    setUserProfileImage: (state, action) => {
      state.user = { ...state.user, profile_image: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload?.user;
        state.user = {
          user_id: user?.user_id,
          user_name: user?.user_name,
          role_id: user?.role_id,
          role: user?.role,
        };
        state.accessToken = action.payload?.access_token || null;
        state.isUserLoggedIn = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = initialState.user;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
        state.resetPasswordToken = action.payload?.token || null;
        state.forgotPasswordEmail = action.meta.arg.email;
      })
      .addCase(forgotPassword.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.forgotPasswordSuccess = false;
        state.resetPasswordToken = null;
        state.error = action.payload as string;
      })

      // VERIFY OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpVerified = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.resetPasswordToken = action.payload?.token || null;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.otpVerified = false;
        state.resetPasswordToken = null;
        state.error = action.payload as string;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.resetPasswordSuccess = false;
        state.error = action.payload as string;
      })

      // UPDATE USER PROFILE
      //   .addCase(updateUserProfile.pending, (state) => {
      //     state.loading = true;
      //     state.error = null;
      //   })
      //   .addCase(updateUserProfile.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.user = action.payload || state.user;
      //     state.error = null;
      //   })
      //   .addCase(updateUserProfile.rejected, (state, action: PayloadAction<unknown>) => {
      //     state.loading = false;
      //     state.error = action.payload as string;
      //   })

      // LOGOUT USER
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isUserLoggedIn = false;
        state.error = null;
        state.accessToken = undefined;
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.isUserLoggedIn = false;
        state.error = action.payload as string;
        state.accessToken = undefined;
      })
      // REFRESH TOKEN
      .addCase(refreshToken.pending, (state) => {
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action?.payload?.access_token || null;
      })
      .addCase(refreshToken.rejected, (state, action: PayloadAction<unknown>) => {
        state.error = action.payload as string;
      });
  },
});
export const { setIsUserLoggedIn, setIsUserVerified, setUserProfileImage } = loginSlice.actions;
export default loginSlice.reducer;
