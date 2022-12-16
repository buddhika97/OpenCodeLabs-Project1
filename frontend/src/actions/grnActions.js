import axios from 'axios'

export const listGrn = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/probatch`, config)

  return data
}



export const createGrn = async (product) => {
  console.log(product)

  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }

  delete product.token

  return await axios.post(`/api/probatch`, product, config)
}

