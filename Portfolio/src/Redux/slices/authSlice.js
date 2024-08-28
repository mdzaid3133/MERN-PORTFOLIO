import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {},
};

export const login = createAsyncThunk('admin/login', async (data, { rejectWithValue }) => {
    try {
        const loginResponse = axios.post('http://localhost:6001/admin/v1/user/login', data);

        toast.promise(
            loginResponse,
            {
                loading: 'Waiting...',
                success: (res) => res?.data?.message || 'Logged In Successfully!',
                error: (err) => err?.response?.data?.message || 'Failed to Login',
            }
        );

        const result = await loginResponse; // Await the actual response here
        console.log('auth Data', result.data); // Use result.data for the actual data
        return result.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            toast.error(error.response.data.message || 'An error occurred');
            return rejectWithValue(error.response.data);
        }
        toast.error('An unexpected error occurred');
        return rejectWithValue(error.message);
    }
});



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload.user.role);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action.payload.user.role);
                localStorage.setItem('data', JSON.stringify(action.payload.user));
                state.isLoggedIn = true;
                state.role = action.payload.user.role;
                state.data = action.payload.user;
            });
    },
});

export default authSlice.reducer;
