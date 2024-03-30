import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    status: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.status = true
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            state.status = false
        },
        subscription: (state, action) => {
            if (state.user.data.subscribedUsers.includes(action.payload)) {
                state.user.data.subscribedUsers.splice(
                    state.user.data.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.user.data.subscribedUsers.push(action.payload)
            }
        },
        savedVideos : (state,action) => {
            if (state.user.data.savedVideos.includes(action.payload)) {
                state.user.data.savedVideos.splice(
                    state.user.data.savedVideos.findIndex(
                        (VideoId) => VideoId === action.payload
                    ),
                    1
                );
            } else {
                state.user.data.savedVideos.push(action.payload)
            }
        },
    }
})

export const { loginSuccess, logout ,subscription,savedVideos} = authSlice.actions;

export default authSlice.reducer;