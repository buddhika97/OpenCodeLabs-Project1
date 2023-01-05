import axios from 'axios'
import {
  getCustomersRequest,
  getCustomersSuccess,
  getCustomersFail,

  getSingleCustomerRequest,
  getSingleCustomerSuccess,
  getSingleCustomerFail,

  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFail,

  removeCustomersRequest,
  removeCustomersSuccess,
  removeCustomersFail,


  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFail,
  createCustomerReset,


} from '../reducers/customerSlice'





export const createCustomer = (customer) => async (dispatch, getState) => {
  try {
    dispatch(createCustomerRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/customer/`, customer, config)

    dispatch(createCustomerSuccess(customer))
    
  } catch (error) {
    dispatch(
      createCustomerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const getCustomerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(getSingleCustomerRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/customer/${id}`, config)

    dispatch(getSingleCustomerSuccess(data))
  } catch (error) {
    dispatch(
        getSingleCustomerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}



export const listCustomers = () => async (dispatch, getState) => {
  try {
    dispatch(getCustomersRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    

    const { data } = await axios.get(`/api/customer`, config)

    dispatch(getCustomersSuccess(data))
  } catch (error) {
    dispatch(
      getCustomersFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}


export const removeCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch(removeCustomersRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
       
      },
    }

    await axios.delete(`/api/customer/${id}`, config)
   

    dispatch(removeCustomersSuccess(id))
  } catch (error) {
    dispatch(
      removeCustomersFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}



export const updateCustomer = (formdata, id) => async (dispatch, getState) => {
  try {
    dispatch(updateCustomerRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/customer/${id}`, formdata, config)




    dispatch(updateCustomerSuccess(data))
  } catch (error) {
    dispatch(
      updateCustomerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}


//list customers
export const listAllCustomers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/customer`, config)

  return data
}