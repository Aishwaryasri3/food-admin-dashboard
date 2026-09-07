import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from './features/OrdersSlice'
import authReducer from "./features/AuthSlice"
import themeReducer from "./features/ThemeSlice"
const store = configureStore({
    reducer:{
        orders: ordersReducer,
        auth: authReducer,
        theme : themeReducer
    }
})
export default store