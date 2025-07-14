import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    userLoginStatus : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state , action) => {
            state.userLoginStatus = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const { login , logout } = authSlice.actions;
export default authSlice.reducer;