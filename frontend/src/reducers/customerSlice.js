import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customerInfo: {},
  customers: [],
}

const customerReducer = createSlice({
  name: 'customerInfo',
  initialState,
  reducers: {
    getCustomersRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
      state.customers = []
    },
    getCustomersSuccess: (state, action) => {
      state.loading = false
      state.error = false
      state.success = true
      state.customers = action.payload
    },
    getCustomersFail: (state, action) => {
      state.loading = false
      state.error = true
      state.success = false
      state.customers = []
      state.error = action.payload
    },


    removeCustomersRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
      state.customers = []
    },
    removeCustomersSuccess: (state, action) => {
      state.loading = false
      state.error = false
      state.success = true
      state.customers = state.customers.filter((customer) => customer.id !== action.payload)
    },
    removeCustomersFail: (state, action) => {
      state.loading = false
      state.error = true
      state.success = false
      state.customers = []
      state.error = action.payload
    },
    

    getSingleCustomerRequest: (state) => {
      state.cusLoading = true
      state.cusError = false
      state.cusSuccess = false
      state.customerInfo = {}
    },
    getSingleCustomerSuccess: (state, action) => {
      state.cusLoading = false
      state.cusError = false
      state.cusSuccess = true
      state.customerInfo = action.payload
    },
    getSingleCustomerFail: (state, action) => {
      state.cusLoading = false
      state.cusError = true
      state.cusSuccess = false
      state.customerInfo = {}
      state.error = action.payload
    },
 
    updateCustomerRequest: (state) => {
      state.cusLoading = true
      state.cusError = false
      state.cusSuccess = false
      state.customerInfo = {}
    },
    updateCustomerSuccess: (state, action) => {
      state.cusLoading = false
      state.cusError = false
      state.cusSuccess = true
      state.customerInfo = action.payload
    },
    updateCustomerFail: (state, action) => {
      state.cusLoading = false
      state.cusError = true
      state.cusSuccess = false
      state.customerInfo = {}
      state.error = action.payload
    },
  

    createCustomerRequest: (state) => {
      state.cusLoading = true
      state.cusError = false
      state.cusSuccess = false
      state.customerInfo = {}
    },
    createCustomerSuccess: (state, action) => {
      state.cusLoading = false
      state.cusError = false
      state.cusSuccess = true
      state.customers = state.customers.push(action.payload)
    },
    createCustomerFail: (state, action) => {
      state.cusLoading = false
      state.cusSuccess = false
      state.cusError = action.payload
    },
    createCustomerReset: (state) => {
      state.cusLoading= false
      state.cusError = false
      state.cusSuccess = false
      state.loading = false
      state.error = false
      state.success = false
    },
  },
})

export const {
  getCustomersRequest,
  getCustomersSuccess,
  getCustomersFail,

  getSingleCustomerRequest,
  getSingleCustomerSuccess,
  getSingleCustomerFail,
  getSingleCustomerReset,

  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFail,
  updateCustomerReset,

  removeCustomersRequest,
  removeCustomersSuccess,
  removeCustomersFail,

  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFail,
  createCustomerReset,

} = customerReducer.actions
export default customerReducer.reducer
