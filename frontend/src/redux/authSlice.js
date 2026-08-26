import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token : null,
    user : null,
    isAuthenticated: !! localStorage.getItem("token")
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login : (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            
            localStorage.setItem("token", action.payload.token);
        },
        logout : (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;