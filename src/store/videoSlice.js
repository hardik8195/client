import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    video: {},
    status: false,
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideo: (state, action) => {
            state.status = true
            state.video = action.payload
        },
        like: (state, action) => {
            if (!state.video.likes.includes(action.payload)) {
                state.video.likes.push(action.payload);
                state.video.dislikes.splice(
                    state.video.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
        dislike: (state, action) => {
            if (!state.video.dislikes.includes(action.payload)) {
                state.video.dislikes.push(action.payload);
                state.video.likes.splice(
                    state.video.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
        
    },
})

export const { setVideo, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;