import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useMutation, useQueryClient } from 'react-query'
import { sendForBucket } from '../actions/materialActions'
import { toast } from 'react-toastify'

export default function BluePrintModle({ qrHandler, handleClose, open, data }) {
  const queryClient = useQueryClient()

  const addToBucketMutaion = useMutation(sendForBucket, {
    onSuccess: () => {
      queryClient.invalidateQueries('bluePrint')
      toast.success('Material sent to the bucket!')
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      console.log(error)
    },
  })

  const handleFormSubmit = (values) => {
   
    data.bluePrintQty = values.qty
    data.id = data.material.id
    addToBucketMutaion.mutate(data)
   
  }

  const checkoutSchema = yup.object().shape({
    qty: yup.number().max(data.qty, 'Invalid qty').required('required'),
  })

  const initialValues = {
    qty: '',
  }

  return (
    <div>
      <Button variant='outlined' onClick={qrHandler}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Add to Blueprint</DialogTitle>
        <DialogContent>
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
                  gridTemplateColumns='repeat(2, minmax(0, 1fr))'
                >
                  <TextField
                    fullWidth
                    variant='filled'
                    type='number'
                    label='Quantity'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='qty'
                    error={!!touched.qty && !!errors.qty}
                    helperText={touched.qty && errors.qty}
                    sx={{ gridColumn: 'span 2' }}
                  />
                </Box>
                <Box display='flex' justifyContent='end' mt='20px'>
                  <Button type='submit' color='secondary' variant='contained'  onClick={handleClose}>
                    Add To Bucket
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
