import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {OrderService} from "../services/order-service"

export const createOrder = createAsyncThunk(
"order/createOrder",
async (order, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await OrderService.AddOrder(order);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const getOrders = createAsyncThunk(
"order/getOrders",
async ( _, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await OrderService.GetOrder();
return res.data.Orders;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const updateOrder = createAsyncThunk(
"order/updateOrder",
async (obj, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await OrderService.EditOrder(obj);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const deleteOrder = createAsyncThunk(
"order/deleteOrder",
async (id, thunkAPI) => {

const { rejectWithValue } = thunkAPI;
try{
await OrderService.DeleteOrder(id);
return id ;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const findOrderByID = createAsyncThunk(
"order/findOrderByID",
async (id, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await OrderService.GetOrderById(id);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const orderSlice = createSlice({
name: 'order',
initialState:{
orders:[],
order:{},
isLoading: false,
success:null,
error:null,
},
reducers: {
removeSelectedOrder: (state) => {
state.success=null
state.error=null

}
},
extraReducers: (builder) => {
        //get scategories
        builder
//getOrders
.addCase(getOrders.pending,(state,action)=>{
state.isLoading=true;
state.error=null;

})
.addCase(getOrders.fulfilled, (state, action) => {
state.isLoading=false;
state.error = null;
state.orders=action.payload;
})
.addCase(getOrders.rejected,(state, action) => {
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})


//createOrder
.addCase(createOrder.pending,(state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(createOrder.fulfilled, (state, action) => {
state.orders.push(action.payload);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
.addCase(createOrder.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
state.success=null;
})
//updateOrder
.addCase(updateOrder.pending,(state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(updateOrder.fulfilled, (state, action) => {
state.orders = state.orders.map((item) =>
item._id === action.payload._id ? action.payload : item
);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
//deleteOrder
.addCase(deleteOrder.pending, (state, action) => {

state.isLoading=true;
state.error=null;
})
.addCase(deleteOrder.fulfilled, (state, action) => {
state.orders=state.orders.filter((item)=> item._id!==action.payload)
state.isLoading=false;
state.error=null;
})
.addCase(deleteOrder.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
})
//findOrderByID
.addCase(findOrderByID.pending, (state, action) => {
state.isLoading = true
state.error = null
})
.addCase(findOrderByID.fulfilled,(state, action) => {
state.isLoading = false
state.error = null
state.order=action.payload;
})
}
}
)
export const { removeSelectedOrder } = orderSlice.actions

export default orderSlice.reducer;