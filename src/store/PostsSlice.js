import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    postsFetchedStatus : false,
    postsFetched : null
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
        }
    }
})

export const { addPosts , removePosts } = postsSlice.actions;
export default postsSlice.reducer;