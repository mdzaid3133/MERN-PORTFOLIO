import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";


const initialState = {
     experiencesData : [],
     loading:false,
     error: null,
 
}

export const addExperenceData = createAsyncThunk(
  'experence/addExperenceData',
  async (data, { rejectWithValue }) => {
    try {
      // Create the POST request promise
      const addPromise = axios.post('https://mern-portfolio-ywxa.onrender.com/admin/v1/experience', data);
      
      // Handle toast notifications with the promise
      // toast.promise(addPromise, {
      //   pending: "Wait! Adding expernce data...",
      //   success: (res) => res?.data?.message || 'expernce data added successfully!',
      //   error: (err) => err?.response?.data?.message || 'Failed to add expernce data',
      // });

      // Await the POST request and get the response
      const response = await addPromise;
      return response.data;

    } catch (error) {
      console.error('Error adding expernce data:', error);

      // Handle specific error responses or generic error
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
      // toast.error(errorMessage);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


export const fetchExperienceData = createAsyncThunk('experience/fetchExperienceData', async (_, { rejectWithValue }) => {
    try {
        // Perform the API request
        const response = axios.get('https://mern-portfolio-ywxa.onrender.com/admin/v1/experience');

        // Show a loading toast while waiting for the response
        // toast.promise(response, {
        //     pending: "Wait! Fetching experience data...",
        //     success: (res) => {
        //         return res?.data?.message || 'experience data fetched successfully!';
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
        console.error('Error fetching experience data:', error);
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

export const deleteExperienceData = createAsyncThunk(
    '/experience/delete',
    async (id, { rejectWithValue }) => {
      try {

  
        //console.log("Updating data for ID:", id);
  
        // Making the PUT request to update home data
        const deletePromise = axios.delete(`https://mern-portfolio-ywxa.onrender.com/admin/v1/experience/${id}`);
  
        // toast.promise(deletePromise, {
        //   pending: "Wait! Deleting experience data...",
        //   success: (res) => res?.data?.message || 'experience data deleted successfully!',
        //   error: (err) => err?.response?.data?.message || 'Failed to delete data',
        // });
  
        const response = await deletePromise;
        return response.data;
  
      } catch (error) {
        console.log('Error deleting experience data:', error);
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


  export const updateExperienceData = createAsyncThunk(
    '/experience/updateExperienceData',
    async (data, { rejectWithValue }) => {
      try {
        const dataObject = data[0]; // The data to be updated
        const id = data[1]; // The ID to use in the API URL
  

  
        // Making the PUT request to update home data
        const updatePromise = axios.put(`https://mern-portfolio-ywxa.onrender.com/admin/v1/experience/${id}`, dataObject);
  
        // toast.promise(updatePromise, {
        //   pending: "Wait! Updating experience data...",
        //   success: (res) => res?.data?.message || 'Experience data updated successfully!',
        //   error: (err) => err?.response?.data?.message || 'Failed to update data',
        // });
  
        const response = await updatePromise;
        return response.data;
  
      } catch (error) {
        console.log('Error updating experience data:', error);
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


const experienceSlice = createSlice({
    initialState,
    name: 'experience',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExperienceData.fulfilled, (state, action) => {
                state.experiencesData = action.payload?.data   
                state.loading = true
            })
            .addCase(addExperenceData.fulfilled, (state, action) => {
              // Optionally update state based on the added skill
              state.experiencesData.push(action.payload?.data);
            })
            .addCase(deleteExperienceData.fulfilled, (state, action) => {
              // Optionally update state based on the deleted skill
              state.experiencesData = state.experiencesData.filter(exprence => exprence._id !== action.payload._id);
            });
    },
})


export default experienceSlice.reducer