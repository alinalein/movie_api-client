import { createSlice } from "@reduxjs/toolkit";

// otherwise Redux initialize the state to null on page reload and user will need to login again
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // here can not set only user or only token, when use dispatch , redux will expect an object with token & user
        // if only user was returned by API and has to be set write  dispatch(setUser({ user: data, token: token })) , so token will stay as it is 
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }

    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;