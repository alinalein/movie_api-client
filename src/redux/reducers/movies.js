import { createSlice } from "@reduxjs/toolkit";

// will define action to store the movies from API
// createSlice, function accepts initial state , object of reducer function, it returns slice
// the returned slice is like isolated piece of Redux configuration, so can extract ations & reducers
const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        filter: ''
    },
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

// export the actions from moviesSlice
export const { setMovies, setFilter } = moviesSlice.actions;
// export the reducer from moviesSlice
export default moviesSlice.reducer;