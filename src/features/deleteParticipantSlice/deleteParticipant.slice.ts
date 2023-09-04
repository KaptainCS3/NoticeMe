import { createSlice } from "@reduxjs/toolkit";
import participantType from "../../types/participantType/participantType";

interface deleteParticipantState{
    deleteParticipant: participantType[] | [];
}

const initialValues:deleteParticipantState ={
    deleteParticipant: []
}

const deleteParticipantData = createSlice({
    name: 'deleteParticipant',
    initialState: initialValues,
    reducers: {
        deleteMember:(state, action) =>{
            state.deleteParticipant = action.payload;
        }
    }
})

export const {deleteMember} = deleteParticipantData.actions;
export default deleteParticipantData.reducer