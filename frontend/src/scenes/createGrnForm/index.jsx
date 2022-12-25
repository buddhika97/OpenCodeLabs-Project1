import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'

import AdminHeader from '../../components/AdminHeader'
import {  useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import {  useMutation } from 'react-query'
import { createGrn } from '../../actions/grnActions'

const CreateGrnForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const addProductMutation = useMutation(createGrn, {
    onSuccess: () => {
      toast.success('GRN created!')
      navigate('/admin/grn')
    },

    onError: (error) => {
      toast.error(error.response.data)
      console.log(error)
    },
  })

  const handleFormSubmit = (values) => {
    addProductMutation.mutate({ ...values, token: userInfo.token })
  }

  return (
    <Box m='20px'>
      <AdminHeader title='CREATE GRN' subtitle='Create a GRN' />

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
                label='Quantity'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.qty}
                name='qty'
                error={!!touched.qty && !!errors.qty}
                helperText={touched.qty && errors.qty}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Item Cost'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.costPrice}
                name='costPrice'
                error={!!touched.costPrice && !!errors.costPrice}
                helperText={touched.costPrice && errors.costPrice}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Sales Price'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name='salesPrice'
                error={!!touched.salesPrice && !!errors.salesPrice}
                helperText={touched.salesPrice && errors.salesPrice}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Product / Material Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create a GRN
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}


const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  salesPrice: yup.number().required('required'),
  costPrice: yup.number().required('required'),
  qty: yup.number().required('required'),
})
const initialValues = {
  qty: '',
  salesPrice: '',
  costPrice:'',
  name: '',
}

export default CreateGrnForm
