// loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";
import { FirebaseError } from "firebase/app";

// Async thunk for sending OTP
export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (phoneNumber, { rejectWithValue }) => {
    const recaptcha = new RecaptchaVerifier(auth,'recaptcha-container', {} );
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      recaptcha.clear();
      // console.log(confirmation);
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
      if (!verificationId){
        
      }
        // throw new Error("Verification ID is missing.");
        
        console.log("object");

      const credential = PhoneAuthProvider.credential(verificationId, otp);
      
      const result = await signInWithCredential(auth, credential);

      console.log(result)

      return { phone: result.user.phoneNumber};

    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/invalid-verification-code") {
        return rejectWithValue("Invalid OTP. Please try again.");
      } else {  
        console.error(error);
        return rejectWithValue("OTP verification failed. Please try again.");
      }
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
});


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
