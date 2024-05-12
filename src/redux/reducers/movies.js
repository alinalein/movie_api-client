import { createSlice } from "@reduxjs/toolkit";

// will define action to store the movies from API
// createSlice, function accepts initial state , object of reducer function, it returns slice
// the returned slice is like isolated piece of Redux configuration, so can extract ations & reducers
const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        // title the user will search for is set to empty
        filter: '',
        hasSearched: false
    },
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
            state.hasSearched = true;
        },
        // Reset the search status
        resetSearch: (state) => {
            state.hasSearched = false;
        }
    }
})

// export the actions from moviesSlice
export const { setMovies, setFilter, resetSearch } = moviesSlice.actions;
// export the reducer from moviesSlice
export default moviesSlice.reducer;