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

  import { getMaterialById, updateMaterial} from '../../actions/materialActions'
  import {
    useLocation,
    useNavigate,
    useParams,

  } from 'react-router-dom'
  import { useQuery, useMutation} from 'react-query'
 
  import { toast } from 'react-toastify'
  
  const MaterialUpdateForm = () => {
  
    const location = useLocation()
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
  
    console.log(id)
    const users = useSelector((state) => state.userLogin)
    const { userInfo } = users
  
    const {
      isLoading,
      isError,
      error,
      data: material,
    } = useQuery(['material', userInfo.token, id], getMaterialById)
  
    const addProductMutation = useMutation( updateMaterial, {
      onSuccess: () => {
       
        toast.success('Material Updated!')
  
        if (location.search.split('=')[1] === 'out') {
          navigate('/admin/outmaterial')
        }else{
          navigate('/admin/material')
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
      content = material.data
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
          title='UPDATE MATERIAL'
          subtitle='Update a existing Material'
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
              type='number'
              label={content.brand}
              onChange={change}
              value={form.brand}
              id='barnd'
              sx={{ gridColumn: 'span 4' }}
            />
  
            <InputLabel>Re Order Level</InputLabel>
            <TextField
              fullWidth
              variant='filled'
              type='text'
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
              Update Material
            </Button>
          </Box>
        </form>
      </Box>
    )
  }
  
  export default MaterialUpdateForm
  