import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import eventSliceReducer from "../features/eventSlice/event.slice"
import participantSliceReducer from '../features/memberSlice/member.slice'
import loginSliceReducer from '../features/loginSlice/login.slice'
import editParticipantReducer from '../features/editParticipantSlice/editParticipant.slice'
export const store = configureStore({
  reducer: {
    eventSlice: eventSliceReducer,
    memberSlice: participantSliceReducer,
    loginSlice: loginSliceReducer,
    editSlice: editParticipantReducer,
  },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

