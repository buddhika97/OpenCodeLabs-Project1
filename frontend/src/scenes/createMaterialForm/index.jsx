import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'

import AdminHeader from '../../components/AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import {

  createMaterial,
} from '../../actions/materialActions'

const CreateMaterialForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users



  const addProductMutation = useMutation( createMaterial, {
    onSuccess: () => {
      toast.success('Material Added!')
      navigate('/admin/outmaterial')
    },
  })



  const handleFormSubmit = (values) => {
    addProductMutation.mutate({ ...values, token: userInfo.token })
  }

  return (
    <Box m='20px'>
      <AdminHeader title='CREATE Product' subtitle='Create a New Product' />

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
                type='text'
                label='Category'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name='category'
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Brand'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand}
                name='brand'
                error={!!touched.brand && !!errors.brand}
                helperText={touched.brand && errors.brand}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Re Order Level'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.re_order_level}
                name='re_order_level'
                error={!!touched.re_order_level && !!errors.re_order_level}
                helperText={touched.re_order_level && errors.re_order_level}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Description'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name='description'
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create a New Material
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
  category: yup.string().required('required'),
  brand: yup.string().required('required'),
  re_order_level: yup.number().required('required'),
  description: yup.string(),
})
const initialValues = {
  name: '',
  category: '',
  brand: '',
  re_order_level: '',
  description: '',
}

export default CreateMaterialForm
