import axios from "axios";

export const letestTransactions = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.queryKey[1]}`,
      },
    }
  
    const { data } = await axios.get(`/api/sales/latest`, config)
    return data
  }


  export const totalSales = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.queryKey[1]}`,
      },
    }
  
    const { data } = await axios.get(`/api/sales/total`, config)
    return data
  }

  export const totalCustomers = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.queryKey[1]}`,
      },
    }
  
    const { data } = await axios.get(`/api/customer/total`, config)
    return data
  }


  export const totalCost = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.queryKey[1]}`,
      },
    }
  
    const { data } = await axios.get(`/api/probatch/total`, config)
    return data
  }

