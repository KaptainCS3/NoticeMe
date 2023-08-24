import {configureStore} from '@reduxjs/toolkit';
import eventSliceReducer from "../features/eventSlice/event.slice"
import participantSliceReducer from '../features/memberSlice/member.slice'
import loginSliceReducer from '../features/loginSlice/login.slice'
export const store = configureStore({
  reducer: {
    eventSlice: eventSliceReducer,
    memberSlice: participantSliceReducer,
    loginSlice: loginSliceReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

