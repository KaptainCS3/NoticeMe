import { createSlice } from "@reduxjs/toolkit";
import eventType from "../../types/eventSlice";

interface editState{
    editEvent: eventType[] | [];
}

const initialValues:editState = {
    editEvent: []
}

const editEventData = createSlice({
    name: 'editEvent',
    initialState: initialValues,
    reducers:{
        editEvent:(state, action) =>{
        state.editEvent = action.payload;
        }
    }
})

export const {editEvent} = editEventData.actions
export default editEventData.reducer