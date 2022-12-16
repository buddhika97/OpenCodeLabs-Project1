import axios from 'axios'

export const listMaterialsInStock = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/material?stock=in`, config)

  return data
}

export const listMaterialsOutStock = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/material`, config)

  return data
}

export const createMaterial = async (product) => {
  console.log(product)

  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }

  delete product.token

  return await axios.post(`/api/material`, product, config)
}

export const getMaterialById = async (details) => {
  console.log(details)
  const config = {
    headers: {
      Authorization: `Bearer ${details.queryKey[1]}`,
    },
  }

  return await axios.get(`/api/material/${details.queryKey[2]}`, config)
}

export const updateMaterial = async (product) => {
  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }
  const id = product.id
  console.log(product.token)
  delete product.token

  delete product.id

  return await axios.put(`/api/material/${id}`, product, config)
}

export const RemoveMaterial = async (product) => {
  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }
  const id = product.id

  return await axios.delete(`/api/material/${id}`, config)
}

export const sendForBucket = (product) => {
  // Get the existing products from local storage, or initialize an empty object
  const products = JSON.parse(localStorage.getItem('bluePrintBucket')) || {}

  // If the product is already in the bucket, increment its quantity
  if (products[product.id]) {
    products[product.id].bluePrintQty += product.bluePrintQty
  } else {
    // Otherwise, add the product to the bucket
    products[product.id] = product
  }

  // Save the updated products to local storage
  localStorage.setItem('bluePrintBucket', JSON.stringify(products))
}

export const getBluePrintList =  (token) => {
  const  data  =  Object.values(
    JSON.parse(localStorage.getItem('bluePrintBucket'))
  )


  return data
}
