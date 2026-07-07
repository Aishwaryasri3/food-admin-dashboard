import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("adminUser"))
const initialState = {
    userName :  storedUser?.userName || "",
     isLoggedIn : storedUser?.isLoggedIn || false
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login: (state, action) => {
            state.userName = action.payload,
            state.isLoggedIn = true
        },
        logout : (state, action) => {
            state.userName = "",
           state.isLoggedIn = false
           localStorage.removeItem("adminUser")
        }

    }

})
export const {login, logout} = authSlice.actions
export const selectUserName = (state) => state.auth.userName
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export default authSlice.reducer