import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userUpdate: {}
}


const userUpdateReducer = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    // getOne
    userUpdateRequest: (state) => {
      state.loading = true
      state.error = false
      state.false = true
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false
      state.userUpdate = action.payload
      state.success = true
    },
    userUpdateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },

    userUpdateReset: (state) => {
      state.loading = false
      state.userUpdate = {}
      state.success = false
    },
    
  },
})


export const {
 
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
  userUpdateReset

} = userUpdateReducer.actions
export default userUpdateReducer.reducer