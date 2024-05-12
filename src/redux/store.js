import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies'
import userReducer from './reducers/user'

// set up Redux store
export const store = configureStore({
    reducer: {
        movies: moviesReducer, user: userReducer
    },
});