import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const initialState = {
     contactData : null,
     loading: false,
     error: null,
 
}


export const fetchContactData = createAsyncThunk('contact/fetchContactData', async (_, { rejectWithValue }) => {
    try {
        // Perform the API request
        const response = axios.get('https://mern-portfolio-ywxa.onrender.com/admin/v1/contact');

        // Show a loading toast while waiting for the response
        // toast.promise(response, {
        //     pending: "Wait! Fetching contact data...",
        //     success: (res) => {
        //         return res?.data?.message || 'Contact data fetched successfully!';
        //     },
        //     error: (err) => {
        //         return err?.response?.data?.message || 'Failed to fetch data';
        //     }
        // });

        // Await the actual response and check for data existence
        const { data } = await response

        if (!data) {
            throw new Error('No data returned from the server');
        }

        // Return the fetched data to be used in the reducer
        return data;
    } catch (error) {
        console.error('Error fetching contact data:', error);
        // Handle cases where `response` or `response.data` is undefined
        if (error.response && error.response.data) {
            // toast.error(error.response.data.message || 'An error occurred');
            return rejectWithValue(error.response.data);
        } else {
            // toast.error('An error occurred. Please try again later.');
            return rejectWithValue(error.message);
        }
    }
});

export const updateContactData = createAsyncThunk(
    '/contact/update',
    async (data ,{ rejectWithValue }) => {
      try {
        const dataObject = data[0]; // The data to be updated
        const id = data[1]; // The ID to use in the API URL
  
        // Making the PUT request to update home data
        const updatePromise = axios.put(`https://mern-portfolio-ywxa.onrender.com/admin/v1/contact/${id}`,dataObject,{
          headers: { 'Content-Type': 'application/json' }
      });
  
        // toast.promise(updatePromise, {
        //   pending: "Wait! Updating contact data...",
        //   success: (res) => res?.data?.message || 'contact data updated successfully!',
        //   error: (err) => err?.response?.data?.message || 'Failed to delete data',
        // });
  
        const response = await updatePromise;
        return response.data;
  
      } catch (error) {
        console.log('Error updating contact data:', error);
        if (error.response && error.response.data) {
          // toast.error(error.response.data.message || 'An error occurred');
          return rejectWithValue(error.response.data);
        } else {
          // toast.error('An error occurred. Please try again later.');
          return rejectWithValue(error.message);
        }
      }
    }
  );


const contactSlice = createSlice({
    initialState,
    name: 'contact',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactData.fulfilled, (state, action) => {

                state.contactData = action.payload?.data[0]
                state.loading = true
                
            })
            .addCase(updateContactData.fulfilled, (state, action) => {
              state.contactData = action.payload?.data[0]
              
          })
    },
})


export default contactSlice.reducer