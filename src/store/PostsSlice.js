import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

let initialState = {
    postsFetchedStatus : false,
    postsFetched : null,
    userPostsFetched : null,
    userPostsFetchedStatus : false
}

let postsSlice = createSlice({
    name : "Posts",
    initialState,
    reducers : {
        addPosts : (state , action) => {
            state.postsFetchedStatus = true;
            state.postsFetched = action.payload;
        },
        removePosts : (state) => {
            state.postsFetchedStatus = false;
            state.postsFetched = null;
            state.userPostsFetched = null;
            state.userPostsFetchedStatus = false;
        },
        addUserPosts : (state , action) => {
            state.userPostsFetchedStatus = true;
            state.userPostsFetched = action.payload;
        }
    }
})

export const { addPosts , removePosts , addUserPosts } = postsSlice.actions;
export default postsSlice.reducer;