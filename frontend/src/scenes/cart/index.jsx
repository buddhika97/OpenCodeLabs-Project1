import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  useTheme,
} from '@mui/material'

import { tokens } from '../../theme'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useSelector } from 'react-redux'

import { createSales } from '../../actions/salesActions'
import { toast } from 'react-toastify'
import { getCartList } from '../../actions/cartAction'

const Cart = () => {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const colors = tokens(theme.palette.mode)
  const [selectedRows, setSelectedRows] = useState([])
  const [build, setBuild] = useState(0)

  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

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
        ?.reduce((acc, cv) => acc + cv.costPrice * cv.qty, 0)
        .toFixed(2),
      discount: build,
      token: userInfo.token,
    })
  }

  return (
    <Box>
      <Box m='20px 200px'>
        <Box margin='20px 0 20px'>
          {content?.map((item, index) => (
            <Grid container key={index}>
              <Grid item xs={9} fontSize='25px'>
                {item.name}
              </Grid>
              <Grid item xs={1} fontSize='25px'>
                {item.costPrice} * {item.qty}
              </Grid>
              <Grid item xs={2} fontSize='25px'>
                = {(item.costPrice * item.qty).toFixed(2)} LKR
              </Grid>
            </Grid>
          ))}
        </Box>
        <hr />
        <Box margin='20px 0 20px'>
          <Grid container>
            <Grid item xs={9} fontSize='25px'>
              CART TOTAL
            </Grid>
            <Grid item xs={1} fontSize='25px'></Grid>
            <Grid item xs={2} fontSize='25px'>
              ={' '}
              {content
                ?.reduce((acc, cv) => acc + cv.costPrice * cv.qty, 0)
                .toFixed(2)}{' '}
              LKR
            </Grid>
          </Grid>
        </Box>
        <hr />
        <Box margin='20px 0 20px'>
          <Grid container>
            <Grid item xs={9} fontSize='25px'>
              Discount
            </Grid>
            <Grid item xs={1} fontSize='25px'></Grid>
            <Grid item xs={2} fontSize='25px' diplay='flex'>
              <input
                type='number'
                style={{ width: '100px', color: 'black' }}
                value={build}
                onChange={(e) => setBuild(e.target.value)}
                required
              />{' '}
              LKR
            </Grid>
          </Grid>
        </Box>
        <Box margin='20px 0 20px' paddingTop='20px' borderTop=' thick double'>
          <Grid container>
            <Grid item xs={9} fontSize='25px'>
              SUB TOTAL
            </Grid>
            <Grid item xs={1} fontSize='25px'></Grid>
            <Grid item xs={2} fontSize='25px'>
              ={' '}
              {content
                ?.reduce((acc, cv) => acc + cv.costPrice * cv.qty, 0)
                .toFixed(2) - Number(build)}{' '}
              LKR
            </Grid>
          </Grid>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant='contained'
            color='secondary'
            onClick={createSale}
          >
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
