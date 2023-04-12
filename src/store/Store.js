import { configureStore } from '@reduxjs/toolkit'
import orderReducer from '../slices/OrderSlice'
import tableReducer from '../slices/TableSlice'
import productReducer from '../slices/ProductSlice'
import informationReducer from '../slices/InformationSlice'
import tokenReducer from '../slices/TokenSlice'


export const Store = configureStore({
  reducer: {
    order:orderReducer,
    table:tableReducer,
    product: productReducer,
    information: informationReducer,
    token:tokenReducer
  },
})