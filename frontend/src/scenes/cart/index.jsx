import { Autocomplete, Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material'

import { tokens } from '../../theme'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useSelector } from 'react-redux'

import { createSales } from '../../actions/salesActions'
import { toast } from 'react-toastify'
import { getCartList } from '../../actions/cartAction'
import { listAllCustomers } from '../../actions/customerActions'

const Cart = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const queryClient = useQueryClient()
  const [keyword, setKeyword] = useState('')
  const [build, setBuild] = useState(0)

  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users


  const {
    data: customers,
  } = useQuery(['customers', userInfo.token], listAllCustomers)


  const {
    isLoading,
    isError,
    error,
    data: cart,
  } = useQuery(['cart'], getCartList)

  const createMutation = useMutation(createSales, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart')
      toast.success('Success!')
      navigate('/admin/sales')
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      console.log(error)
    },
  })

  let content
  if (isLoading) {
  } else if (isError) {
  } else {
    content = cart
  }

  console.log(content)
  const resetCart = () => {
    localStorage.removeItem('cart')
    window.location.reload()
  }

  const createSale = () => {
    createMutation.mutate({
      SalesItems: content,
      cartTotal: content
        ?.reduce((acc, cv) => acc + cv.salesPrice * cv.qty, 0)
        .toFixed(2),
      discount: build,
      customer:keyword,
      token: userInfo.token,
    })
  }

console.log(keyword)

  const customerEmail = []

  customers?.forEach(item => customerEmail.push(item.email))

  return (
    <Box>
      <Box m='20px 200px'>
      <Autocomplete
          fullWidth
          variant='filled'
          disablePortal
          id='combo-box-demo'
          options={customerEmail}
          onChange={(event, value) => setKeyword(value)}
          sx={{ background: `${colors.primary[400]}` }}
          renderInput={(params) => <TextField {...params} label='Customer Email' />}
        />
        <Box margin='20px 0 20px'>
          {content?.map((item, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              borderBottom={`4px solid ${colors.primary[500]}`}
              p='15px'
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant='h5'
                  fontWeight='600'
                >
                  {item.name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {/* {transaction.user ? transaction.user : 'Admin'} */}
                </Typography>
              </Box>
              <Box color={colors.grey[100]} textAlign='right'>
                {item.salesPrice} * {item.qty}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p='5px 10px'
                borderRadius='4px'
              >
                {(item.salesPrice * item.qty).toFixed(2)} LKR
              </Box>
            </Box>
          ))}
        </Box>
        <hr />
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          borderBottom={`4px solid ${colors.primary[500]}`}
          p='15px'
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant='h5'
              fontWeight='600'
            >
              CART TOTAL
            </Typography>
            <Typography color={colors.grey[100]}>
              {/* {transaction.user ? transaction.user : 'Admin'} */}
            </Typography>
          </Box>
          <Box color={colors.grey[100]} textAlign='right'></Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p='5px 10px'
            borderRadius='4px'
          >
            ={' '}
            {content
              ?.reduce((acc, cv) => acc +(cv.salesPrice * cv.qty), 0)
              .toFixed(2)}{' '}
            LKR
          </Box>
        </Box>
        <hr />
       
         <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          borderBottom={`4px solid ${colors.primary[500]}`}
          p='15px'
    
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant='h5'
              fontWeight='600'
            >
               Discount
            </Typography>
            <Typography color={colors.grey[100]}>
              {/* {transaction.user ? transaction.user : 'Admin'} */}
            </Typography>
          </Box>
          <Box color={colors.grey[100]} textAlign='right'></Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p='5px 10px'
            borderRadius='4px'
          >
            <input
                type='number'
                style={{ width: '100px', color: 'black' }}
                value={build}
                onChange={(e) => setBuild(e.target.value)}
                required
              />
          </Box>
        </Box>

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          borderBottom={`4px solid ${colors.primary[500]}`}
          p='15px'
          borderTop=' thick double'
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant='h5'
              fontWeight='600'
            >
              SUB TOTAL
            </Typography>
            <Typography color={colors.grey[100]}>
              {/* {transaction.user ? transaction.user : 'Admin'} */}
            </Typography>
          </Box>
          <Box color={colors.grey[100]} textAlign='right'></Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p='5px 10px'
            borderRadius='4px'
          >
            ={' '}
            {(content
              ?.reduce((acc, cv) => acc + cv.costPrice * cv.qty, 0)
              .toFixed(2) - Number(build)).toFixed(2)}{' '}
            LKR
          </Box>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant='contained' color='secondary' onClick={createSale}>
            Submit
          </Button>
          <Button variant='contained' color='error' onClick={resetCart}>
            Reset
          </Button>
        </div>
      </Box>
    </Box>
  )
}

export default Cart
