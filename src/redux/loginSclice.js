  import { createSlice } from '@reduxjs/toolkit';

  const loginSlice = createSlice({
    name: 'login',
    initialState: {
      phone: '',
      otp: '',
      loading: false,
      error: null,
      otpVerified: false,
    },
    reducers: {
      setPhone: (state, action) => {
        state.phone = action.payload;
      },
      setOtp: (state, action) => {
        state.otp = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setOtpVerified: (state, action) => {
        state.otpVerified = action.payload;
      },
      resetLoginState: (state) => {
        state.phone = '';
        state.otp = '';
        state.loading = false;
        state.error = null;
        state.otpVerified = false;
      }
    }
  });

  export const { setPhone, setOtp, setLoading, setError, setOtpVerified, resetLoginState } = loginSlice.actions;
  export default loginSlice.reducer;
