import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import AdminHeader from '../../components/AdminHeader'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductById } from '../../actions/productActions'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { updateProduct, createProduct } from '../../actions/productActions'
import { toast } from 'react-toastify'

const UserUpdateForm = () => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const dispatch = useDispatch()
  const { id } = useParams()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    category: '',
    brand: '',
    re_order_level: '',
    description: '',
  })

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: product,
  } = useQuery(['product', userInfo.token, id], getProductById)

  const addProductMutation = useMutation( updateProduct, {
    onSuccess: () => {
     
      toast.success('Product Added!')

      if (location.search.split('=')[1] === 'out') {
        navigate('/admin/outproduct')
      }else{
        navigate('/admin/product')
      }


    },
  })

  //   const queryParams = new URLSearchParams(location.search);

  //   // Now you can use the queryParams object to access individual query parameters
  //   const param1 = queryParams.get('param1');

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = product.data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addProductMutation.mutate({ ...form, token: userInfo.token, id })
  }

  const change = (e) => {
    if (!e.target.files) {
      setForm((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    }
  }

  return (
    <Box m='20px'>
      <AdminHeader
        title='UPDATE CUSTOMER'
        subtitle='Create a New User Profile'
      />

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
            label={content.name}
            onChange={change}
            value={form.name}
            id='name'
            sx={{ gridColumn: 'span 4' }}
          />

          <InputLabel>Category</InputLabel>
          <TextField
            fullWidth
            variant='filled'
            type='text'
            label={content.category}
            onChange={change}
            value={form.category}
            id='category'
            sx={{ gridColumn: 'span 4' }}
          />

          <InputLabel>Brand</InputLabel>
          <TextField
            fullWidth
            variant='filled'
            type='text'
            label={content.brand}
            onChange={change}
            value={form.brand}
            id='brand'
            sx={{ gridColumn: 'span 4' }}
          />

          <InputLabel>Re Order Level</InputLabel>
          <TextField
            fullWidth
            variant='filled'
            type='number'
            label={content.re_order_level}
            onChange={change}
            value={form.re_order_level}
            id='re_order_level'
            sx={{ gridColumn: 'span 4' }}
          />

          <InputLabel>Description</InputLabel>
          <TextField
            fullWidth
            variant='filled'
            type='text'
            label={content.description}
            onChange={change}
            value={form.description}
            id='description'
            sx={{ gridColumn: 'span 4' }}
          />
        </Box>
        <Box display='flex' justifyContent='end' mt='20px'>
          <Button type='submit' color='secondary' variant='contained'>
            Update Product
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default UserUpdateForm
