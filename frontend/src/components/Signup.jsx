import { useState } from 'react'
import { toast } from 'react-toastify'
import { signupFields } from '../constants/formFields'
import FormAction from './FormActions'
import Input from './Input'
import axios from 'axios'
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

  //handle Signup API Integration here
  const createAccount = async (signupState) => {
    try {
      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        signupState ,
        config
      )

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      toast.error(error.response.data.sqlMessage)
        console.log(error.response.data.sqlMessage)
    }
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
