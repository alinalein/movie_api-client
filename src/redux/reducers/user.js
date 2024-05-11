import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // variables with initial state "null"
        user: null,
        token: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }

    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;