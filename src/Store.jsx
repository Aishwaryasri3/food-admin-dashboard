import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from '../../food-delivery-dashboard/src/features/OrdersSlice'
import authReducer from "../../food-delivery-dashboard/src/features/AuthSlice"
import themeReducer from "../../food-delivery-dashboard/src/features/ThemeSlice"
const store = configureStore({
    reducer:{
        orders: ordersReducer,
        auth: authReducer,
        theme : themeReducer
    }
})
export default store