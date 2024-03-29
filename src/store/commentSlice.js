import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comment:[]
}



const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        addComment:(state,action) => {
            const comment = {
                _id:action.payload._id,
                userId:action.payload.userId,
                desc:action.payload.desc
            }
            state.comment.push(comment)
        },
        deleteComment:(state,action) => {
            state.comment = state.comment.filter((item)=>item._id !== action.payload)
        },
        setItems:(state,action) => {
            state.comment = action.payload
        }
    }
})

export const { addComment,setItems,deleteComment } = commentSlice.actions;

export default commentSlice.reducer;