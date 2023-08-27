import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loginType from "../../types/loginType/loginType";

const initialValues: loginType = {
    email: '',
    password: ''
}

const loginSlice = createSlice({
    name: 'loginState',
    initialState: initialValues,
    reducers:{
        loginUser:(state, actions: PayloadAction<loginType>) =>{
            state = actions.payload;
        }
    }
})

export const { loginUser} = loginSlice.actions
export default loginSlice.reducer