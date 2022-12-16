import { Box, Button,  useTheme } from '@mui/material'
import { DataGrid} from '@mui/x-data-grid'
import { tokens } from '../../theme'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DesignServices from '@mui/icons-material/DesignServices'
import Add from '@mui/icons-material/Add'

import Header from '../../components/Header'
import AdminHeader from '../../components/AdminHeader'
import { useEffect, useState } from 'react'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { listCustomers, removeCustomer } from '../../actions/customerActions'
import { createCustomerReset } from '../../reducers/customerSlice'

const Customer = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selectedRows, setSelectedRows] = useState([])
  const navigate = useNavigate()





  const customersList = useSelector((state) => state.customer)
  const { loading, error,success, customers } = customersList

  console.log(customers)
  const dispatch = useDispatch()
  console.log(selectedRows)

  useEffect(() => {
    dispatch(createCustomerReset())
    dispatch(listCustomers())
  }, [])


  console.log(customers)
  const updateUser = () => {
    console.log('bam')
    navigate('/admin/customerupdate/'+selectedRows[0].id)
  }

const  createUser = () => {
  navigate('/admin/createcustomer')
}

  const removeUser = () => {
      dispatch(removeCustomer(selectedRows[0].id))
      dispatch(listCustomers())
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },

    {
      field: 'nic',
      headerName: 'NIC',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
   
    
  ]

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: false }} />

    
          <Button
          className='p-0 pe-2'
          variant="text"
         
          onClick={() => createUser()}
        >
          <Add fontSize='small' />
          <span className='px-2'>Add Customer</span>
        </Button>



        {selectedRows.length === 1 && (
          <Button
          className='p-0 pe-2'
          variant="text"
         
          onClick={() => removeUser()}
        >
          <DeleteOutline fontSize='small' />
          <span className='px-2'>Remove Customer</span>
        </Button>
        )}

        {selectedRows.length === 1 && (
          <Button
          className='p-0 pe-2'
          variant="text"
         
          onClick={() => updateUser()}
        >
          <DesignServices fontSize='small' />
          <span className='px-2'>Update Customer</span>
        </Button>
        )}

       
      </GridToolbarContainer>
    )
  }


  if(loading) {
    <h3>Loading....</h3>
  }

  return (
    <Box m='20px'>
      <AdminHeader title='CUSTOMERS' subtitle='Managing Customers' />
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={customers}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids)
            const selectedRows = customers.filter((row) =>
              selectedIDs.has(row.id)
            )
            setSelectedRows(selectedRows)
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Box>
  )
}

export default Customer
