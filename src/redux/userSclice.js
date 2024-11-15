import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";

// Async action for creating a user
export const createUser = createAsyncThunk(
    'user/createUser',

    async (userData, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, "users"), userData);
            return { id: docRef.id, ...userData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        loading: false,
        error: null,
        otpVerified: false,
    },
    reducers: {
        // Update each field individually
        setFirstName: (state, action) => {
            state.userData.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.userData.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.userData.email = action.payload;
        },
        setPhone: (state, action) => {
            state.userData.phone = action.payload;
        },
        updateUserData: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export the newly added actions
export const { setFirstName, setLastName, setEmail, setPhone, updateUserData } = userSlice.actions;
export default userSlice.reducer;

