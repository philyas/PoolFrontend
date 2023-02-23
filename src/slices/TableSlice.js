import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const TableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    tableAction: (state, action)=> {
        state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { tableAction } = TableSlice.actions

export default TableSlice.reducer