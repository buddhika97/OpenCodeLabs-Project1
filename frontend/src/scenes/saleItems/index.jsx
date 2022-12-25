import { Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DesignServices from '@mui/icons-material/DesignServices'
import Add from '@mui/icons-material/Add'
import CropFree from '@mui/icons-material/CropFree'

import AdminHeader from '../../components/AdminHeader'
import { useEffect, useRef, useState } from 'react'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'

import { useNavigate } from 'react-router-dom'

import { useQuery } from 'react-query'
import { listGrn } from '../../actions/grnActions'
import { useSelector } from 'react-redux'
import { listSales, listSalesItems } from '../../actions/salesActions'

const SalesItems = () => {
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
    data: salesItems,
  } = useQuery(['salesItems', userInfo.token], listSalesItems)

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = salesItems
  }

  console.log(selectedRows)

  const createGrn = () => {
    navigate('/admin/creategrn')
  }

  const columns = [
    { field: 'id', headerName: 'SaleItem ID', flex: 1 },
    {
      field: 'saleId',
      headerName: 'Sales ID',
      flex: 1,
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
    },

    {
      field: 'quantity',
      headerName: 'Quantity',
    },

    {
      field: 'costPrice',
      headerName: 'Cost',

      flex: 1,
    },

    {
      field: 'price',
      headerName: 'Price',
      cellClassName: 'name-column--cell',
      flex: 1,
    },

    {
      field: 'date',
      headerName: 'Time Stamp',
      flex: 1,
    },
  ]

  console.log(content)
  let rows = content?.map((content) => ({
    id: content.id,
    saleId: content.saleId,
    productId: content.productId,
    productName: content.productName,
    quantity: content.quantity,
    costPrice: content.costPrice,
    price: content.price,
    date: new Date(content.createdAt).toString().slice(0, 25),
  }))

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: false }} />
      </GridToolbarContainer>
    )
  }

  return (
    <Box m='20px'>
      <AdminHeader title='SALES' subtitle='Sales View' />

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

export default SalesItems
