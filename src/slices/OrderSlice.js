import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderAction: (state, action)=> {
        state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { orderAction } = OrderSlice.actions

export default OrderSlice.reducer