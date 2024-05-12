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
        // setUser will only take update that inclused user & token in object
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        removeUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
            document.body.classList.add('background-image');
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;