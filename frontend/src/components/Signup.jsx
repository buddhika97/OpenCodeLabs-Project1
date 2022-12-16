import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { signupFields } from '../constants/formFields'
import FormAction from './FormActions'
import Input from './Input'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetErrors } from '../reducers/userSlice'
const fields = signupFields
let fieldsState = {}

fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Signup() {
  
  const [signupState, setSignupState] = useState(fieldsState)
  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (signupState.password !== signupState.confirmpassword) {
      toast.error('Password not matching!')
    }else{
      createAccount(signupState)
    }
    
  }


  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userRegister
  const navigate = useNavigate()
  let { search } = useLocation()

  const redirect = search ? search.split('=')[1] : '/admin'


  useEffect(() => {
    dispatch(resetErrors()) // reset error msg
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])



  const createAccount = async (signupState) => {
    dispatch(register(signupState))
  }

  if(loading) {
    return(
      <>
       <h3>Loading...</h3>
      </>
    )
  }

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className=''>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text='Signup' />
      </div>
    </form>
  )
}
