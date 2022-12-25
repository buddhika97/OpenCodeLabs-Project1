
export const addToCart = (product) => {
    // Get the existing products from local storage, or initialize an empty object
    const products = JSON.parse(localStorage.getItem('cart')) || {}
    console.log(product)
    // Otherwise, add the product to the bucket
    products[product.id] = product
    // Save the updated products to local storage
    localStorage.setItem('cart', JSON.stringify(products))
  }
  


  export const getCartList =  () => {
    const  data  =  Object.values(
      JSON.parse(localStorage.getItem('cart'))
    )
    return data
  }
  