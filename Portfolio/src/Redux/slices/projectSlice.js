import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const initialState = {
     projectsData : [],
     loading: false,
    error: null,
 
}


export const fetchProjectData = createAsyncThunk('project/fetchProjectData', async (_, { rejectWithValue }) => {
    try {
        // Perform the API request
        const response = axios.get('https://mern-portfolio-ywxa.onrender.com/admin/v1/project');

        // Show a loading toast while waiting for the response
        // toast.promise(response, {
        //     pending: "Wait! Fetching project data...",
        //     success: (res) => {
        //         return res?.data?.message || 'Project data fetched successfully!';
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
        console.error('Error fetching project data:', error);
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

export const deleteProjectData = createAsyncThunk(
    '/project/delete',
    async (id, { rejectWithValue }) => {
      try {

  
  
        // Making the PUT request to update home data
        const deletePromise = axios.delete(`https://mern-portfolio-ywxa.onrender.com/admin/v1/project/${id}`);
  
        // toast.promise(deletePromise, {
        //   pending: "Wait! Deleting project data...",
        //   success: (res) => res?.data?.message || 'Project data deleted successfully!',
        //   error: (err) => err?.response?.data?.message || 'Failed to delete data',
        // });
  
        const response = await deletePromise;
        return response.data;
  
      } catch (error) {
        console.log('Error deleting project data:', error);
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
// Add project data
export const addProjectData = createAsyncThunk(
  'project/addProjectData',
  async (data, { rejectWithValue }) => {
    try {
      // Create the POST request promise
      const addPromise = axios.post('https://mern-portfolio-ywxa.onrender.com/admin/v1/project', data);
      
      // Handle toast notifications with the promise
      // toast.promise(addPromise, {
      //   pending: "Wait! Adding project data...",
      //   success: (res) => res?.data?.message || 'Project data added successfully!',
      //   error: (err) => err?.response?.data?.message || 'Failed to add project data',
      // });

      // Await the POST request and get the response
      const response = await addPromise;
      return response.data;

    } catch (error) {
      console.error('Error adding skill data:', error);

      // Handle specific error responses or generic error
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
      // toast.error(errorMessage);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateProjectData = createAsyncThunk(
  '/project/update',
  async (data, { rejectWithValue }) => {
    try {
      const dataObject = data[0]; // The data to be updated
      const id = data[1]; // The ID to use in the API URL


      // Making the PUT request to update home data
      const updatePromise = axios.put(`https://mern-portfolio-ywxa.onrender.com/admin/v1/project/${id}`, dataObject);

      // toast.promise(updatePromise, {
      //   pending: "Wait! Updating project data...",
      //   success: (res) => res?.data?.message || 'Project data updated successfully!',
      //   error: (err) => err?.response?.data?.message || 'Failed to update data',
      // });

      const response = await updatePromise;
      return response.data;

    } catch (error) {
      console.log('Error updating Project data:', error);
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

const projectSlice = createSlice({
    initialState,
    name: 'project',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectData.fulfilled, (state, action) => {
                state.projectsData = action.payload?.data
                state.loading = true
                
            })
            .addCase(deleteProjectData.fulfilled, (state, action) => {
              // Optionally update state based on the deleted skill
              state.projectsData = state.projectsData.filter(project => project._id !== action.payload._id);
            })
            .addCase(addProjectData.fulfilled, (state, action) => {
              // Optionally update state based on the deleted skill
              state.projectsData.push(action.payload?.data);
            });
    },
})


export default projectSlice.reducer