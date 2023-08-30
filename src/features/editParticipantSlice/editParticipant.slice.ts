import { createSlice } from "@reduxjs/toolkit";
import participantType from "../../types/participantType/participantType";

interface editParticipantState {
    data: participantType[] | []
}
const initialValues: editParticipantState = {
    data: []
}

const editParticipantState = createSlice({
    name: 'editParticipant',
    initialState: initialValues,
    reducers:{
        editParticipant:(state, action) => {
            state.data = action.payload;
            // const {name, email, phone, avarta, user_id} = action.payload
            // const participant = state.data.find(items => items.user_id === user_id)
            // if(participant){
            //     participant.name = name;
            //     participant.email = email;
            //     participant.phone = phone;
            //     participant.avarta = avarta;
            // }
        }
    }
}) 

export const {editParticipant} = editParticipantState.actions;
export default editParticipantState.reducer