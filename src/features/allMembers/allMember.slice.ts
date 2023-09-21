import { createSlice } from "@reduxjs/toolkit";
import participantType from "../../types/participantType/participantType";

interface memberStates {
    allMembers: participantType[] | [];
}

const initialValues: memberStates = {
    allMembers: []
}

const allMemberData = createSlice({
    name: 'allMembers',
    initialState: initialValues,
    reducers:{
        fetchMembers:(state, action) => {
            state.allMembers = action.payload
        }
    }
})

export const { fetchMembers} = allMemberData.actions;
export default allMemberData.reducer