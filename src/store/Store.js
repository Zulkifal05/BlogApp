import {configureStore} from '@reduxjs/toolkit';
import authSlice from './AuthSlice';
import postsSlice from './PostsSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        posts : postsSlice
    },
});


export default store;