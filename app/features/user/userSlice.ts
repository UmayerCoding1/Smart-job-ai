import {createSlice} from "@reduxjs/toolkit";

interface User {
    email: string;
    password: string;
    _id?: string
}


interface AuthState {
    user: User | null
}

const initialState : AuthState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;