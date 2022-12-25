import { Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import DesignServices from '@mui/icons-material/DesignServices'

import AdminHeader from '../../components/AdminHeader'
import {  useState } from 'react'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'

import { useNavigate } from 'react-router-dom'

import { useQuery } from 'react-query'
import { listMaterialsInStock } from '../../actions/materialActions'
import { useSelector } from 'react-redux'

const Material = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selectedRows, setSelectedRows] = useState([])

  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: materials,
  } = useQuery(['materialsIn', userInfo.token], listMaterialsInStock)

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = materials
  }

  const updateMaterial = () => {
    navigate('/admin/updateMaterial/' + selectedRows[0].material.id)
  }


  const columns = [
    { field: 'matId', headerName: 'Material ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
     
      cellClassName: 'name-column--cell',
    },

    {
      field: 'id',
      headerName: 'Batch ID',
      flex: 1,
    },
    {
      field: 'qty',
      headerName: 'Qty',
      
    },

    {
      field: 'costPrice',
      headerName: 'Cost',
      
    },
    {
      field: 'salesPrice',
      headerName: 'Sales Price',
      
    },

    {
      field: 'reOrder',
      headerName: 'Re Order Level',
     
    },
    {
      field: 'category',
      headerName: 'Category',
     
    },

    {
      field: 'brand',
      headerName: 'Brand',
     
    },
    
  ]

  let rows = content?.map((content) => ({
    id: content.id,
    matId: content.material.id,
    name: content.material.name,
    qty: content.qty,
    costPrice: content.costPrice,
    salesPrice: content.salesPrice,
    category: content.material.category,
    brand: content.material.brand,
    reOrder: content.material.re_order_level,
  }))

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
      <AdminHeader title='MATERIALS' subtitle='Managing in Stock Materials' />

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

export default Material
