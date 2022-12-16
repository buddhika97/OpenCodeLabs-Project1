import axios from 'axios'

export const listBluePrints = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.queryKey[1]}`,
    },
  }

  const { data } = await axios.get(`/api/blueprint`, config)

  return data
}


export const createBlueprint = async (product) => {
  console.log(product)

  const config = {
    headers: {
      Authorization: `Bearer ${product.token}`,
    },
  }

  localStorage.setItem('bluePrintBucket', JSON.stringify({}))

  return await axios.post(`/api/blueprint`, product.bluePrintObject
  , config)
}


// export const sendForBucket = (product) => {
//     // Get the existing products from local storage, or initialize an empty object
//     const products = JSON.parse(localStorage.getItem('bluePrintBucket')) || {}
  
//     // If the product is already in the bucket, increment its quantity
//     if (products[product.id]) {
//       products[product.id].bluePrintQty += product.bluePrintQty
//     } else {
//       // Otherwise, add the product to the bucket
//       products[product.id] = product
//     }
  
//     // Save the updated products to local storage
//     localStorage.setItem('bluePrintBucket', JSON.stringify(products))
//   }
  
//   export const getBluePrintList =  (token) => {
//     const  data  =  Object.values(
//       JSON.parse(localStorage.getItem('bluePrintBucket'))
//     )
  
  
//     return data
//   }
  



// export const getMaterialById = async (details) => {
//   console.log(details)
//   const config = {
//     headers: {
//       Authorization: `Bearer ${details.queryKey[1]}`,
//     },
//   }

//   return await axios.get(`/api/material/${details.queryKey[2]}`, config)
// }

// export const updateMaterial = async (product) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${product.token}`,
//     },
//   }
//   const id = product.id
//   console.log(product.token)
//   delete product.token

//   delete product.id

//   return await axios.put(`/api/material/${id}`, product, config)
// }

// export const RemoveMaterial = async (product) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${product.token}`,
//     },
//   }
//   const id = product.id

//   return await axios.delete(`/api/material/${id}`, config)
// }

