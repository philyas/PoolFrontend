import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {logged:false, userid:undefined},
}

export const TokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenAction: (state, action)=> {
        state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { tokenAction } = TokenSlice.actions

export default TokenSlice.reducer