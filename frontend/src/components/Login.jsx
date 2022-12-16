import { useEffect, useState } from 'react'
import { loginFields } from '../constants/formFields'
import FormAction from './FormActions'
import FormExtra from './FormExtra'
import Input from './Input'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../actions/userActions'
import { resetErrors } from '../reducers/userSlice'
const fields = loginFields

let fieldsState = {}

fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState)

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authenticateUser(loginState)
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const navigate = useNavigate()
  const dispatch = useDispatch()
  let { search } = useLocation()

  const redirect = search ? search.split('=')[1] : '/admin'
  


  
  useEffect(() => {
    dispatch(resetErrors()) 
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])



  if (error) {
    toast.error(error)
  }

  if (loading) {
    return <h3>Loading........</h3>
  }

  //Handle Login API Integration here
  const authenticateUser = (loginState) => {
    dispatch(login(loginState))
  }

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className='-space-y-px'>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text='Login' />
    </form>
  )
}
