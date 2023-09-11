import { createSlice } from "@reduxjs/toolkit";
import participantType  from "../../types/participantType/participantType";

interface participantState{
    createdMember: participantType[] | [];
}

const initialValues:participantState = {
    createdMember: [],
}

const memberSlice = createSlice({
    name: 'memberSlice',
    initialState: initialValues,
    reducers:{
        addMember: (state, actions) =>{
            state.createdMember = actions.payload
        }
    }
})

export const {addMember} = memberSlice.actions

export default memberSlice.reducer