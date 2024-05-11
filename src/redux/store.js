import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies'

// set up Redux store
export const store = configureStore({
    reducer: {
        movies: moviesReducer
    },
});