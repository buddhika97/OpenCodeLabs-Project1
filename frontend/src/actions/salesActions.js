import axios from 'axios'



export const createSales = async (products) => {
  localStorage.removeItem('cart')
  const config = {
    headers: {
      Authorization: `Bearer ${products.token}`,
    },
  }

  delete products.token

  const {data} = await axios.post(`/api/sales`, products, config)
  return data
}


export const listSales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/sales`, config)

  return data
}

export const listSalesItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/sales/items`, config)

  return data
}


export const getInvoiceData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/sales/invoice/${token.queryKey[1]}`)

  return data
}




