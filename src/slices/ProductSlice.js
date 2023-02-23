import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productAction: (state, action)=> {
        state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { productAction } = ProductSlice.actions

export default ProductSlice.reducer