import {createSlice} from '@reduxjs/toolkit';
import eventType from '../../types/eventType/eventType';

interface eventState {
  data: eventType[] | [];
  error: string;
  loading: boolean;
}

const initialValues: eventState = {
  data: [],
  error: '',
  loading: false,
};

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: initialValues,
  reducers: {
    createEvent: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {createEvent} = eventSlice.actions;

export default eventSlice.reducer;
