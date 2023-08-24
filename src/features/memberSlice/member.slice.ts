import { createSlice } from "@reduxjs/toolkit";
import participantType  from "../../types/participantType/participantType";

interface participantState{
    data: participantType[] | [];
    error: string;
    loading: boolean;
}

const initialValues:participantState = {
    data: [],
    error: '',
    loading: false
}

const memberSlice = createSlice({
    name: 'memberSlice',
    initialState: initialValues,
    reducers:{
        addMember: (state, actions) =>{
            state.data = actions.payload
        }
    }
})

export const {addMember} = memberSlice.actions

export default memberSlice.reducer