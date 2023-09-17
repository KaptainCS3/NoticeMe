import {createSlice} from '@reduxjs/toolkit';
import eventType from '../../types/eventType/eventType';

interface eventState {
  createdEvent: eventType[] | [];
}

const initialValues: eventState = {
  createdEvent: [],
};

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: initialValues,
  reducers: {
    createEvent: (state, action) => {
      state.createdEvent = action.payload;
    },
  },
});

export const {createEvent} = eventSlice.actions;

export default eventSlice.reducer;
