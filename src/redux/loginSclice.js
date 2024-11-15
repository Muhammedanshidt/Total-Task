// loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";
import { FirebaseError } from "firebase/app";

// Async thunk for sending OTP
export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (phoneNumber, { rejectWithValue }) => {
    const recaptcha = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      recaptcha.clear();
      return { phoneNumber, verificationId: confirmation.verificationId };
    } catch (error) {
      recaptcha.clear();
      console.error(error);
      return rejectWithValue("Failed to send OTP");
    }
  }
);

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ otp, verificationId }, { rejectWithValue }) => {
    try {
      if (!verificationId) throw new Error("Verification ID not found");
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const res = await signInWithCredential(auth, credential);
      return { phoneNumber: res.user.phoneNumber, email: res.user.email };
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/invalid-verification-code") {
        return rejectWithValue("Invalid OTP");
      }
      return rejectWithValue("Failed to verify OTP");
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    phone: '',
    otp: '',
    loading: false,
    error: null,
    otpVerified: false,
    verificationId: null
  },
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    resetLoginState: (state) => {
      state.phone = '';
      state.otp = '';
      state.loading = false;
      state.error = null;
      state.otpVerified = false;
      state.verificationId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationId = action.payload.verificationId;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setPhone, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
