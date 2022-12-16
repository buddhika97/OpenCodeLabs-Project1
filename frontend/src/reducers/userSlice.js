import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  userList: [],

  genericuser: {}

}


const userLoginReducer = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // getOne
    userLoginRequest: (state) => {
      state.loading = true
      state.error = false
    },
    userLoginSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.userInfo = action.payload
    },
    userLoginFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    userRegisterRequest: (state) => {
      state.loading = true
      state.error = false
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false
      state.userInfo = action.payload
    },
    userRegisterFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    userLogout: (state) => {
      state.userInfo = null
      state.error = false
    },
    resetErrors:(state) => {
      state.error = false
    },


    userListRequest: (state) => {
      state.loading = true
      state.error = false
    },
    userListSuccess: (state, action) => {
      state.loading = false
      state.userList = action.payload
    },
    userListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },



    userDetailsRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false
      state.genericuser = action.payload
      state.success = true
    },
    userDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },

    userDetailsReset: (state) => {
     state.genericuser = {}
     state.success = false
     state.loading = false
    },
    

  },
})

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,

  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userLogout,
  resetErrors,

  userListRequest,
  userListSuccess,
  userListFail,

  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsReset



} = userLoginReducer.actions
export default userLoginReducer.reducer