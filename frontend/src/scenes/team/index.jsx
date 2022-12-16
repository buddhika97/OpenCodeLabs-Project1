import { Box, Button, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import { mockDataTeam } from '../../data/mockData'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import DesignServices from '@mui/icons-material/DesignServices'

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

const Team = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selectedRows, setSelectedRows] = useState([])
  const navigate = useNavigate()

  const updateUser = () => {
    console.log('bam')
    navigate('/admin/userupdate/'+selectedRows[0].id)
  }

  const users = useSelector((state) => state.userLogin)
  const { loading, error, userList } = users
  const dispatch = useDispatch()
  console.log(selectedRows)

  useEffect(() => {
    dispatch(listUsers())
  }, [])


  console.log(userList)
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1.5 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
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
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'accessLevel',
      headerName: 'Access Level',
      
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            width='60%'
            m=''
            p='5px'
            display='flex'
            justifyContent='center'
            backgroundColor={
              type === 'admin'
                ? colors.greenAccent[600]
                : type === 'manager'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius='4px'
            
          >
            {type === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {type === 'manager' && <SecurityOutlinedIcon />}
            {type === 'user' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {type}
            </Typography>
          </Box>
        )
      },
    },
  ]

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: false }} />

        {selectedRows.length === 1 && (
          <Button
          className='p-0 pe-2'
          variant='contained'
          onClick={() => updateUser()}
        >
          <DesignServices fontSize='small' />
          <span className='px-2'>Update User</span>
        </Button>
        )}

       
      </GridToolbarContainer>
    )
  }

  return (
    <Box m='20px'>
      <AdminHeader title='TEAM' subtitle='Managing Team Members' />
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
          rows={userList}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids)
            const selectedRows = userList.filter((row) =>
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

export default Team
