import { Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import DesignServices from '@mui/icons-material/DesignServices'
import CropFree from '@mui/icons-material/CropFree'

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
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import { useQuery} from 'react-query'
import {
  listProductsInStock,

} from '../../actions/productActions'
import { useSelector } from 'react-redux'

import Qrmodel from '../../components/Qrmodel'
import QRCode from 'qrcode'
import { toast } from 'react-toastify'
import { addToCart } from '../../actions/cartAction'

const Customer = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selectedRows, setSelectedRows] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const qr = useRef('')

  const generateQR = async (text) => {
    try {
      qr.current = await QRCode.toDataURL(text)
    } catch (err) {
      console.error(err)
    }
  }

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: products,
  } = useQuery(['productsIn', userInfo.token], listProductsInStock)


  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = products
  }

  const addTotCart = () => {
    let feedback = prompt(
      'Enter Quantiy(should be lower than Maximum Products)?',
      ''
    )

    if (
      feedback &&
      !isNaN(feedback) &&
      feedback <= selectedRows[0].qty &&
      feedback > 0
    ) {
      selectedRows[0].qty = feedback
      addToCart(selectedRows[0])
      toast.success('Add to cart!')
    }else{
      toast.error('Invalid Input')
    }
  }

  const updateProduct = () => {
    navigate('/admin/updateproduct/' + selectedRows[0].product.id)
  }

  const qrHandler = () => {
    generateQR(
      `http://${window.location.href.split('/')[2]}/product/${
        selectedRows[0].product.id
      }`
    )
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    { field: 'proId', headerName: 'Product ID', flex: 1 },
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
    proId: content.product.id,
    name: content.product.name,
    qty: content.qty,
    costPrice: content.costPrice,
    salesPrice: content.salesPrice,
    category: content.product.category,
    brand: content.product.brand,
    reOrder: content.product.re_order_level,
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
            onClick={() => qrHandler()}
          >
            <CropFree fontSize='small' />
            <span className='px-2'>Generate QR</span>
          </Button>
        )}

        {selectedRows.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => updateProduct()}
          >
            <DesignServices fontSize='small' />
            <span className='px-2'>Update Product</span>
          </Button>
        )}

        {selectedRows.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => addTotCart()}
          >
            <AddShoppingCart fontSize='small' />
            <span className='px-2'>Add To Cart</span>
          </Button>
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <Box m='20px'>
      <AdminHeader title='PRODUCTS' subtitle='Managing Product In Stock' />

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
            const selectedRows = products.filter((row) =>
              selectedIDs.has(row.id)
            )
            setSelectedRows(selectedRows)
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
      <Qrmodel
        onClick={qrHandler}
        qr={qr.current}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  )
}

export default Customer
