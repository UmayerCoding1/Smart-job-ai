import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/user/userSlice';

export const store  = configureStore({
    reducer :{
        authR: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;