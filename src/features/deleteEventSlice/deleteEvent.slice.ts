import { createSlice } from "@reduxjs/toolkit";
import eventType from "../../types/eventSlice";

interface deleteState{
    deleteEvent: eventType[] | [];
}

const initialValues:deleteState = {
    deleteEvent: []
}

const deleteEventData = createSlice({
    name: 'deleteEvent',
    initialState: initialValues,
    reducers:{
        deleteEvent:(state, action) =>{
state.deleteEvent = action.payload;
        }
    }
})

export const {deleteEvent} = deleteEventData.actions
export default deleteEventData.reducer