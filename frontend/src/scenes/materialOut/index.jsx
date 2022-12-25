import { Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DesignServices from '@mui/icons-material/DesignServices'

import Add from '@mui/icons-material/Add'

import AdminHeader from '../../components/AdminHeader'
import {  useRef, useState } from 'react'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'

import { useNavigate } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  listMaterialsOutStock,
  RemoveMaterial,
} from '../../actions/materialActions'
import { useSelector } from 'react-redux'
import QRCode from 'qrcode'
import { toast } from 'react-toastify'

const MaterialOut = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selectedRows, setSelectedRows] = useState([])
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: material,
  } = useQuery(['materials', userInfo.token], listMaterialsOutStock)

  console.log(error)

  const deleteMutation = useMutation(RemoveMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries('materials')
      toast.success('Material Removed!')
      navigate('/admin/outmaterial')
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      console.log(error)
    },
  })

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = material
  }

 console.log(material)
  const handleClose = () => {
    setOpen(false)
  }

  const updateMaterial = () => {
    navigate(`/admin/updateMaterial/${selectedRows[0].id}?prev=out`)
  }

  const createMaterial = () => {
    navigate('/admin/createMaterial')
  }

  const removeMaterial = () => {
    if (window.confirm('Are you sure?')) {
      deleteMutation.mutate({ id: selectedRows[0].id, token: userInfo.token })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1.5 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
    },

    {
      field: 'qty',
      headerName: 'Quantity',
      flex: 1,
    },
    {
      field: 'reorder',
      headerName: 'Re Order Level',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
  ]

  let rows = content?.map((content, key) => ({
    id: content.id,
    name: content.name,
    brand: content.brand,
    qty: content.qty,
    reorder: content.re_order_level,
    description: content.description
    
  }))

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: false }} />

        <Button
          className='p-0 pe-2'
          variant='text'
          onClick={() => createMaterial()}
        >
          <Add fontSize='small' />
          <span className='px-2'>Add Material</span>
        </Button>

    

        {selectedRows.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => removeMaterial()}
          >
            <DeleteOutline fontSize='small' />
            <span className='px-2'>Remove Material</span>
          </Button>
        )}

        {selectedRows.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => updateMaterial()}
          >
            <DesignServices fontSize='small' />
            <span className='px-2'>Update Material</span>
          </Button>
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <Box m='20px'>
      <AdminHeader title='MATERIALS' subtitle='Managing Out Of Stok Materials' />
 
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
          rows={rows}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids)
            const selectedRows = content.filter((row) =>
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

export default MaterialOut
