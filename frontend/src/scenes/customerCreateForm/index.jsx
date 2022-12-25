import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'

import AdminHeader from '../../components/AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createCustomer } from '../../actions/customerActions'
import { useNavigate } from 'react-router-dom'
import { createCustomerReset } from '../../reducers/customerSlice'

const CreateCustomerForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let newCustomer = useSelector((state) => state.customer)

  let { cusError,  cusSuccess,  } = newCustomer

  if (cusSuccess) {
    toast.success('New Customer added!')
    navigate('/admin/customers')
  }

  if (cusError) {
    toast.error(cusError)
  }

  const handleFormSubmit = (values) => {
    dispatch(createCustomerReset())
    dispatch(createCustomer(values))
  }

  return (
    <Box m='20px'>
      <AdminHeader title='CREATE CUSTOMER' subtitle='Create a New Customer Profile' />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='email'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Phone Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name='phone'
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Address'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name='address'
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='NIC'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nic}
                name='nic'
                error={!!touched.nic && !!errors.nic}
                helperText={touched.nic && errors.nic}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create New Customer
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('invalid email'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  address: yup.string(),
  nic: yup.string(),
})
const initialValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  nic: '',
}

export default CreateCustomerForm
