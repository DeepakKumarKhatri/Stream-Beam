import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice';
import systemReducer from './features/systemSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
  },
})