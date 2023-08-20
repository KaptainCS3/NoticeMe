import {configureStore} from '@reduxjs/toolkit';
import eventSliceReducer from "../features/eventSlice/event.slice"
export const store = configureStore({
  reducer: {
    eventSlice: eventSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export default store;
