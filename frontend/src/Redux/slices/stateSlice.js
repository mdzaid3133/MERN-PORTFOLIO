import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMode: localStorage.getItem('mode') ? localStorage.getItem('mode') : undefined || 'dark',
};


const modeSlice = createSlice({
    initialState,
    name: 'mode',
        reducers: {
            toggleMode: (state,action) => {
                state.currentMode = state.currentMode === 'light'? 'dark' : 'light';
                localStorage.setItem('mode', state.currentMode);
            },
        }
})

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;