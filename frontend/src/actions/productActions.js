import axios from 'axios'

export const listProductsInStock = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/product?stock=in`, config)

  return data
}

export const listProductsOuttock = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/product`, config)

  return data
}

export const createProduct = async (product) => {
  console.log(product)

  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }

  delete product.token

  return await axios.post(`/api/product`, product, config)
}

export const getProductById = async (details) => {
  console.log(details)
  const config = {
    headers: {
      Authorization: `Bearer ${details.queryKey[1]}`,
    },
  }

  return await axios.get(`/api/product/${details.queryKey[2]}`, config)
}

export const getProductDetails = async (details) => {
  const { data } = await axios.get(`/api/product/public/${details.queryKey[2]}`)
  return data
}

export const updateProduct = async (product) => {
  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }
  const id = product.id
  console.log(product.token)
  delete product.token

  delete product.id

  return await axios.put(`/api/product/${id}`, product, config)
}

export const RemoveProduct = async (product) => {
  try {
  } catch (error) {}
  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }
  const id = product.id

  return await axios.delete(`/api/product/${id}`, config)
}
