import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const InformationSlice = createSlice({
  name: 'information',
  initialState,
  reducers: {
    informationAction: (state, action)=> {
        state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { informationAction } = InformationSlice.actions

export default InformationSlice.reducer