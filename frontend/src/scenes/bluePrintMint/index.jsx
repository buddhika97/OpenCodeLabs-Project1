import React, { useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import { Box, Button, Grid, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { getBluePrintById } from '../../actions/bluePrintActions'
import { createGrn, updateProBatches } from '../../actions/grnActions'
import { toast } from 'react-toastify'

const Cart = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const [build, setBuild] = useState(0)
  const { id, qty } = useParams()
  console.log(id)

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const addNewBatch = useMutation(createGrn, {
    onSuccess: () => {
      toast.success('GRN created!')
      navigate('/admin/grn')
    },

    onError: (error) => {
      toast.error(error.response.data)
      console.log(error)
    },
  })

  const {
    isLoading,
    isError,
    error,
    data: blueprint,
  } = useQuery(['blueprint', userInfo.token, id], getBluePrintById)

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = blueprint
  }
 console.log(content.resources)

  let createBluePrint = () => {
    if (build > 0) {
        updateProBatches({batches: content.resources, token: userInfo.token})
      addNewBatch.mutate({
        salesPrice:
          content.resources?.reduce(
            (acc, cv) => acc + cv.costPrice * cv.qty,
            0
          ) + Number(build),
        costPrice: content.resources?.reduce(
          (acc, cv) => acc + cv.costPrice * cv.qty,
          0
        ),
        qty: qty,
        name: content.productName,
        token: userInfo.token,
      })
    }else{
      toast.error('Check Variable Cost!')
    }
  }



  return (
    <Box>
      <Box m='20px'>
        <AdminHeader
          title='MINT A Batch'
          subtitle='creating a new custom badge'
        />
      </Box>

      <Box m='0 200px'>
        <Box margin='20px 0 20px'>
          {content.resources.map((item, index) => (
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
              Material Cost
            </Grid>
            <Grid item xs={1} fontSize='25px'></Grid>
            <Grid item xs={2} fontSize='25px'>
              ={' '}
              {content.resources
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
              Variable cost
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
              TOTAL COST PER ITEM
            </Grid>
            <Grid item xs={1} fontSize='25px'></Grid>
            <Grid item xs={2} fontSize='25px'>
              ={' '}
              {content.resources?.reduce(
                (acc, cv) => acc + cv.costPrice * cv.qty,
                0
              ) + Number(build)}
              LKR
            </Grid>
          </Grid>
        </Box>
        <Box margin='20px 0 20px' paddingTop='20px' borderTop=' thick double'>
          <Grid container>
            <Grid item xs={9} fontSize='25px'>
              TOTAL ITEMS 
            </Grid>
            <Grid item xs={1} fontSize='25px'></Grid>
            <Grid item xs={2} fontSize='30px'>
              {qty}
            </Grid>
          </Grid>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant='contained'
            color='secondary'
            onClick={createBluePrint}
          >
            Mint A new Badge
          </Button>
        </div>
      </Box>
    </Box>
  )
}

export default Cart
