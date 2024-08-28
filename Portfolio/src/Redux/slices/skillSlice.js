import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Initial state
const initialState = {
  skillData: [],
};

// Add skill data
export const addSkillData = createAsyncThunk(
  'skill/addSkillData',
  async (data, { rejectWithValue }) => {
    try {
      // Create the POST request promise
      const addPromise = axios.post('http://localhost:6001/admin/v1/skill', data);
      
      // Handle toast notifications with the promise
      toast.promise(addPromise, {
        pending: "Wait! Adding skill data...",
        success: (res) => res?.data?.message || 'Skill data added successfully!',
        error: (err) => err?.response?.data?.message || 'Failed to add skill data',
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


// Fetch skill data
export const fetchSkillData = createAsyncThunk('skill/fetchSkillData', async (_, { rejectWithValue }) => {
  try {
      // Perform the API request
      const response = axios.get('http://localhost:6001/admin/v1/skill');

      // Show a loading toast while waiting for the response
      toast.promise(response, {
          pending: "Wait! Fetching skill data...",
          success: (res) => {
              return res?.data?.message || 'Skill data fetched successfully!';
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
      console.error('Error fetching skill data:', error);
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

// Delete skill data
export const deleteSkillData = createAsyncThunk(
  'skill/deleteSkillData',
  async (id, { rejectWithValue }) => {
    try {
      const deletePromise = axios.delete(`http://localhost:6001/admin/v1/skill/${id}`);

      toast.promise(deletePromise, {
        pending: "Wait! Deleting skill data...",
        success: (res) => res?.data?.message || 'Skill data deleted successfully!',
        error: (err) => err?.response?.data?.message || 'Failed to delete data',
      });

      const response = await deletePromise;
      return response.data;

    } catch (error) {
      console.error('Error deleting skill data:', error);

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

// Skill slice
const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillData.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.skillData = action.payload?.data;
      })
      .addCase(addSkillData.fulfilled, (state, action) => {
        // Optionally update state based on the added skill
        state.skillData.push(action.payload?.data);
      })
      .addCase(deleteSkillData.fulfilled, (state, action) => {
        // Optionally update state based on the deleted skill
        state.skillData = state.skillData.filter(skill => skill.id !== action.payload.id);
      });
  },
});

export default skillSlice.reducer;
