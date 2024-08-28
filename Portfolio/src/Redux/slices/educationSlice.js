import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const initialState = {
     educationsData : []
 
}

export const addEducationData = createAsyncThunk(
  'education/addEducationData',
  async (data, { rejectWithValue }) => {
    try {
      // Create the POST request promise
      const addPromise = axios.post('http://localhost:6001/admin/v1/education', data,{
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Handle toast notifications with the promise
      toast.promise(addPromise, {
        pending: "Wait! Adding education data...",
        success: (res) => res?.data?.message || 'Education data added successfully!',
        error: (err) => err?.response?.data?.message || 'Failed to add education data',
      });

      // Await the POST request and get the response
      const response = await addPromise;
      return response.data;

    } catch (error) {
      console.error('Error adding skill data:', error);

      // Handle specific error responses or generic error
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const fetchEducationtData = createAsyncThunk('education/fetchEducationtData', async (_, { rejectWithValue }) => {
    try {
        // Perform the API request
        const response = axios.get('http://localhost:6001/admin/v1/education');

        // Show a loading toast while waiting for the response
        toast.promise(response, {
            pending: "Wait! Fetching education data...",
            success: (res) => {
                return res?.data?.message || 'Education data fetched successfully!';
            },
            error: (err) => {
                return err?.response?.data?.message || 'Failed to fetch data';
            }
        });

        // Await the actual response and check for data existence
        const { data } = await response
        console.log(data);

        if (!data) {
            throw new Error('No data returned from the server');
        }

        // Return the fetched data to be used in the reducer
        return data;
    } catch (error) {
        console.error('Error fetching education data:', error);
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

export const deleteEducationData = createAsyncThunk(
    '/education/delete',
    async (id, { rejectWithValue }) => {
      try {

        const deletePromise = axios.delete(`http://localhost:6001/admin/v1/education/${id}`);
  
        toast.promise(deletePromise, {
          pending: "Wait! Deleting education data...",
          success: (res) => res?.data?.message || 'Education data deleted successfully!',
          error: (err) => err?.response?.data?.message || 'Failed to delete data',
        });
  
        const response = await deletePromise;
        return response.data;
  
      } catch (error) {
        console.log('Error deleting education data:', error);
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


const educationSlice = createSlice({
    initialState,
    name: 'education',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEducationtData.fulfilled, (state, action) => {
                //console.log("action", action?.payload?.data)
                state.educationsData = action.payload?.data
                
            })
            .addCase(addEducationData.fulfilled, (state, action) => {
              // Optionally update state based on the added skill
              state.educationsData.push(action.payload?.data);
            })
            .addCase(deleteEducationData.fulfilled, (state, action) => {
              //console.log("action", action?.payload?.data)
              state.educationsData = educationsData.filter(education => education._id !== action.payload?._id);
              
          });
    },
})


export default educationSlice.reducer