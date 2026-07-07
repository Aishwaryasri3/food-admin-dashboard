import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    viewOrder : null
}

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await fetch('http://localhost:3000/orders')
        const data = await response.json()
        return data
        
    }
    
)

export const updateOrders = createAsyncThunk(
    'orders/updateOrders',
    async({order, status}) => {

        const updatedorder = {
            ...order,
            status
        }
       
       const response =  await fetch(`http://localhost:3000/orders/${order.id}`,

            {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(updatedorder)

            }
        )
        const data = await response.json()
        return data
       
    }
)
 const  orderSlice = createSlice({
    name : 'orders',
    initialState,
    reducers: {
        setViewOrder : (state, action) => {
            state.viewOrder = action.payload

        },
        // updateOrderStatus: (state, action) => {
        //     const {id, status} = action.payload
        //     const order = state.orders.find((ord) => ord.id === id)
        //     if(order){
        //         order.status = status
        //     }
        // }
        

     },
    extraReducers:(builder) => {
            builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrders.fulfilled,(state,action) => {
                state.orders = action.payload,
                state.loading = false,
                state.error = null
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false,
                state.error = action.error.message
            })

            .addCase(updateOrders.pending, (state) => {
                
                state.error = null
            })

            .addCase(updateOrders.fulfilled,(state, action) => {
                
                const order = state.orders.find((order) => order.id === action.payload.id)
                if(order){
                    order.status = action.payload.status
                }
            })

            .addCase(updateOrders.rejected,(state, action) => {
                
                state.error = action.error.message
            })
    }
 })

 export default orderSlice.reducer
 export const {setViewOrder} =orderSlice.actions 
 export const selectOrders = (state) => state.orders.orders
 export const selectLoading = (state) => state.orders.loading
 export const selectError = (state) => state.orders.error
 export const selectViewOrder = (state) => state.orders.viewOrder
