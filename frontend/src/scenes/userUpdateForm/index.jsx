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
import { getUserDetails, updateUser } from '../../actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'
import { userDetailsReset } from '../../reducers/userSlice'
import {  toast } from 'react-toastify'
import { userUpdateReset } from '../../reducers/userUpdateSlice'


const UserUpdateForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    type: ' ',
    address: '',
  })
  const usersInfo = useSelector((state) => state.userLogin)
  const { loading, error, success, genericuser } = usersInfo

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate

  if (updateSuccess) {
    toast.success('User Updated')
    dispatch(userUpdateReset())
    navigate('/admin/team')
  }

  const isNonMobile = useMediaQuery('(min-width:600px)')

  useEffect(() => {
    dispatch(getUserDetails(id))
    dispatch(userUpdateReset())
    if (genericuser.type) {
      setForm(genericuser)
    }
  }, [genericuser.type, setForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(form))
    // dispatch(updateUser({ _id: id, isAdmin, role }))
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

  return (
    <Box m='20px'>
      <AdminHeader title='UPDATE USER' subtitle='Update User Profile' />

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
            onChange={change}
            value={form.name}
            placeholder={form.name}
            required
            id='name'
            sx={{ gridColumn: 'span 4' }}
          />

          <TextField
            fullWidth
            variant='filled'
            type='text'
            label='Email'
            onChange={change}
            value={form.email}
            required
            id='email'
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant='filled'
            type='text'
            label='Contact Number'
            onChange={change}
            value={form.phone}
            required
            id='phone'
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant='filled'
            type='text'
            label='Address '
            onChange={change}
            value={form.address}
            id='address'
            sx={{ gridColumn: 'span 4' }}
          />

          <TextField
            fullWidth
            variant='filled'
            type='password'
            label='Password'
            onChange={change}
            value={form.password}
            id='password'
            sx={{ gridColumn: 'span 4' }}
          />

          <TextField
            fullWidth
            variant='filled'
            type='number'
            label='Age'
            required
            onChange={change}
            value={form.age}
            id='age'
            sx={{ gridColumn: 'span 2' }}
          />

          <select
            variant='filled'
            label='type'
            onChange={change}
            value={form.type}
            id='type'
            style={{ gridColumn: 'span 2', backgroundColor: '#293040' }}
          >
            <option id='type' value='user'>
              User
            </option>
            <option id='type' value='manager'>
              Manager
            </option>
            <option id='type' value='admin'>
              Admin
            </option>
          </select>
        </Box>
        <Box display='flex' justifyContent='end' mt='20px'>
          <Button type='submit' color='secondary' variant='contained'>
            Update User
          </Button>
        </Box>
      </form>
    </Box>
  )
}


export default UserUpdateForm
