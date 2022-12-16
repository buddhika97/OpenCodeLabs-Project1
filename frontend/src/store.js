import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit'

import userLoginReducer from './reducers/userSlice'
import userUpdateReducer from './reducers/userUpdateSlice'
import customerReducer from './reducers/customerSlice'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
  customer: customerReducer,
})

const store = configureStore(
  { reducer: reducer }
)

export default store
