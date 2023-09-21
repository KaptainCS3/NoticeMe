import { createSlice } from "@reduxjs/toolkit";
import eventType from "../../types/eventType/eventType";

interface eventStates {
    allEvents: eventType[] | [];
}

const initialValues: eventStates = {
    allEvents: []
}

const allEventData = createSlice({
    name: 'allEvents',
    initialState: initialValues,
    reducers:{
        fetchEvents:(state, action) => {
            state.allEvents = action.payload
        }
    }
})

export const { fetchEvents} = allEventData.actions;
export default allEventData.reducer