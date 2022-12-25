import {
  Box,
  Button,
  InputLabel,
  TextField,
} from '@mui/material'

import useMediaQuery from '@mui/material/useMediaQuery'

import AdminHeader from '../../components/AdminHeader'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import {
  getCustomerDetails,
  updateCustomer,
} from '../../actions/customerActions'

const UserUpdateForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    nic: '',
    phone: '',
    address: '',
  })
  const singleCustomer = useSelector((state) => state.customer)
  const { cusLoading, cusSuccess, customerInfo } = singleCustomer

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate

  if (updateSuccess) {
   
  }

  const isNonMobile = useMediaQuery('(min-width:600px)')

  console.log(customerInfo)

  useEffect(() => {
  
    dispatch(getCustomerDetails(id))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateCustomer(form, id))
    toast.success('Customer Updated')
    navigate('/admin/customers')
  }

  const change = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }
    console.log(e.target.id)
    if (!e.target.files) {
      setForm((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value, //if e.target.id is boolean set as true or false, if it's null set as e.target.value ?? ---nulish operator
      }))
    }
  }

  if (cusLoading) {
    return <h3>Loading....</h3>
  }

  if (cusSuccess)
    return (
      <Box m='20px'>
        <AdminHeader title='UPDATE CUSTOMER' subtitle='Update Customer Profile' />

        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            <InputLabel>Name</InputLabel>
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label={customerInfo.name}
              onChange={change}
              value={form.name}
              id='name'
              sx={{ gridColumn: 'span 4' }}
            />

            <InputLabel>Email</InputLabel>
            <TextField
              fullWidth
              variant='filled'
              type='email'
              label={customerInfo.email}
              onChange={change}
              value={form.email}
              id='email'
              sx={{ gridColumn: 'span 4' }}
            />

            <InputLabel>Phone</InputLabel>
            <TextField
              fullWidth
              variant='filled'
              type='number'
              label={customerInfo.phone}
              onChange={change}
              value={form.phone}
              id='phone'
              sx={{ gridColumn: 'span 4' }}
            />

            <InputLabel>Address</InputLabel>
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label={customerInfo.address}
              onChange={change}
              value={form.address}
              id='address'
              sx={{ gridColumn: 'span 4' }}
            />

            <InputLabel>NIC</InputLabel>
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label={customerInfo.nic}
              onChange={change}
              value={form.nic}
              id='nic'
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>
          <Box display='flex' justifyContent='end' mt='20px'>
            <Button type='submit' color='secondary' variant='contained'>
              Update Customer
            </Button>
          </Box>
        </form>
      </Box>
    )
}

export default UserUpdateForm
