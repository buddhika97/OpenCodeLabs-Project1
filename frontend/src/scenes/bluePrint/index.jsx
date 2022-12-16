import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createBlueprint } from '../../actions/bluePrintActions'

import { getBluePrintList } from '../../actions/materialActions'

import AdminHeader from '../../components/AdminHeader'
import { tokens } from '../../theme'

const BluePrint = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [product, setProduct] = useState('')
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: bluePrint,
  } = useQuery(['bluePrint'], getBluePrintList)

  const createMutation = useMutation(createBlueprint, {
    onSuccess: () => {
      queryClient.invalidateQueries('bluePrint')
      toast.success('BluePrint Created!')
      // navigate('/admin/outmaterial')
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      console.log(error)
    },
  })

  let content
  if (isLoading) {
    return <>No items!</>
  } else if (isError) {
    return <>No items!</>
  } else {
    content = bluePrint
  }

  let bluePrintObject = {}
  let resources = {}

  bluePrint.forEach((element) => {
    resources[element.id] = element.bluePrintQty
  })

  bluePrintObject.name = product
  bluePrintObject.resources = resources

  const createBluePrint = () => {
    createMutation.mutate({ bluePrintObject, token: userInfo.token })
  }

  
  return (
    
    <Box m='20px'>
      <AdminHeader
        title='BLUEPRINT'
        subtitle='Create a custom product'
      />

     

      {bluePrint.map((item, index) => (
        <Box
          key={index}
          display='flex'
          justifyContent='space-between'
          marginRight='55%'
        >
          <Typography variant='h5'>{item.material.name}</Typography>
          <Typography variant='h5'>
            {item.bluePrintQty} * {item.costPrice} ={' '}
            {(item.bluePrintQty * item.costPrice).toFixed(2)}
          </Typography>
        </Box>
      ))}

      <Box display='flex' justifyContent='space-between' marginRight='55%'>
        <Typography color={colors.greenAccent[500]} variant='h2'>
          Total
        </Typography>

        <Typography color={colors.greenAccent[500]} variant='h2'>
          {bluePrint
            .reduce((acc, cv) => acc + cv.costPrice * cv.bluePrintQty, 0)
            .toFixed(2)}
        </Typography>
      </Box>

      {bluePrint.length > 0 && (
        <Box display='flex' justifyContent='start' marginRight='55%'>
        <TextField
          fullWidth
          variant='filled'
          type='text'
          label='Product Name'
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <Button onClick={createBluePrint} color='secondary' variant='contained'>
          Create
        </Button>
      </Box>
      )}

      
    </Box>
  )
}

export default BluePrint
