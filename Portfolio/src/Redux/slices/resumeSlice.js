import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const initialState = {
    resumeData: null,
}


export const fetchResumeData = createAsyncThunk('resume/fetchResumeData', async (_, { rejectWithValue }) => {
    try {
        // Perform the API request
        const response = axios.get('https://mern-portfolio-ywxa.onrender.com/admin/v1/resume');

        // Show a loading toast while waiting for the response
        toast.promise(response, {
            pending: "Wait! Fetching resume data...",
            success: (res) => {
                return res?.data?.message || 'resume data fetched successfully!';
            },
            error: (err) => {
                return err?.response?.data?.message || 'Failed to fetch data';
            }
        });

        // Await the actual response and check for data existence
        const { data } = await response

        if (!data) {
            throw new Error('No data returned from the server');
        }

        // Return the fetched data to be used in the reducer
        return data;
    } catch (error) {
        console.error('Error fetching resume data:', error);
        // Handle cases where `response` or `response.data` is undefined
        if (error.response && error.response.data) {
            toast.error(error.response.data.message || 'An error occurred');
            return rejectWithValue(error.response.data);
        } else {
            toast.error('An error occurred. Please try again later.');
            return rejectWithValue(error.message);
        }
    }
});

export const updateResumeData = createAsyncThunk(
    '/resume/update',
    async (data, { rejectWithValue }) => {
      try {
        const dataObject = data[0]; // The data to be updated
        const id = data[1]; // The ID to use in the API URL
  
        console.log("Updating data for ID:", id);
  
        // Making the PUT request to update home data
        const updatePromise = axios.put(`https://mern-portfolio-ywxa.onrender.com/admin/v1/resume/${id}`, dataObject);
  
        toast.promise(updatePromise, {
          pending: "Wait! Updating resume data...",
          success: (res) => res?.data?.message || 'resume data updated successfully!',
          error: (err) => err?.response?.data?.message || 'Failed to update data',
        });
  
        const response = await updatePromise;
        return response.data;
  
      } catch (error) {
        console.log('Error updating resume data:', error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || 'An error occurred');
          return rejectWithValue(error.response.data);
        } else {
          toast.error('An error occurred. Please try again later.');
          return rejectWithValue(error.message);
        }
      }
    }
  );


const resumeSlice = createSlice({
    initialState,
    name: 'resume',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResumeData.fulfilled, (state, action) => {
                console.log("action", action?.payload?.data[0])
                state.resumeData = action.payload?.data[0];
            })
    },
})


export default resumeSlice.reducer