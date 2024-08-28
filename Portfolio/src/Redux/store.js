// store.js
import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import homeReducer from './slices/homeSlice'; 
import aboutReducer from './slices/aboutSlice'; 
import skillReducer from './slices/skillSlice'; 
import projectReducer from './slices/projectSlice'; 
import educationReducer from './slices/educationSlice'; 
import experienceReducer from './slices/experienceSlice'; 
import contactReducer from './slices/contactSlice'; 
import resumeReducer from './slices/resumeSlice'; 
import authReducer from './slices/authSlice'; 

// // Configuration for persisting home state
// const homePersistConfig = {
//   key: 'home',
//   storage,
// };

// // Configuration for persisting about state
// const aboutPersistConfig = {
//   key: 'about',
//   storage,
// };

// // Configuration for persisting skill state
// const skillPersistConfig = {
//   key: 'skill',
//   storage,
// };

// // Configuration for persisting project state
// const projectPersistConfig = {
//   key: 'project',
//   storage,
// };

// // Configuration for persisting education state
// const educationPersistConfig = {
//   key: 'education',
//   storage,
// };

// // Configuration for persisting experience state
// const experiencePersistConfig = {
//   key: 'experience',
//   storage,
// };

// // Creating persisted reducers
// const persistedHomeReducer = persistReducer(homePersistConfig, homeReducer);
// const persistedAboutReducer = persistReducer(aboutPersistConfig, aboutReducer);
// const persistedSkillReducer = persistReducer(skillPersistConfig, skillReducer);
// const persistedProjectReducer = persistReducer(projectPersistConfig, projectReducer);
// const persistedEducationReducer = persistReducer(educationPersistConfig, educationReducer);
// const persistedExperienceReducer = persistReducer(experiencePersistConfig, experienceReducer);

// Configuring the store
const store = configureStore({
  reducer: {
    home: homeReducer,
    about:aboutReducer,
    skill: skillReducer,
    project: projectReducer,
    education: educationReducer,
    experiences: experienceReducer,
    contact: contactReducer,
    resume: resumeReducer,
    auth: authReducer,
    // other reducers if you have
  },
});

// Creating a persistor
//export const persistor = persistStore(store);

export default store;
