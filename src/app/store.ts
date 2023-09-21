import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import allMemberReducer from '../features/allMembers/allMember.slice';
import participantSliceReducer from '../features/memberSlice/member.slice'
import editParticipantReducer from '../features/editParticipantSlice/editParticipant.slice'
import deleteParticipantReducer from '../features/deleteParticipantSlice/deleteParticipant.slice'
import eventSliceReducer from "../features/eventSlice/event.slice"
import allEventReducer from '../features/allEvents/allEvent.slice';
import loginSliceReducer from '../features/loginSlice/login.slice'
import editEventSliceReducer from '../features/editEventSlice/editEvent.slice'
import deleteEventSliceReducer from '../features/deleteEventSlice/deleteEvent.slice'
export const store = configureStore({
  reducer: {
    allMemberSlice: allMemberReducer, //* fetch all members
    createMemberSlice: participantSliceReducer, //? add members
    editParticipantSlice: editParticipantReducer, // edit members
    deleteParticipantSlice: deleteParticipantReducer, //! delete members
    allEventSlice: allEventReducer, //* fetch all events
    createEventSlice: eventSliceReducer, //? create events
    editEventSlice: editEventSliceReducer, // edit events
    deleteEventSlice: deleteEventSliceReducer, //! delete events
    loginSlice: loginSliceReducer, // auth state

  },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

