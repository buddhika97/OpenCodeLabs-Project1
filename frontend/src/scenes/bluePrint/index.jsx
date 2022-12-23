import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  useTheme,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DesignServices from '@mui/icons-material/DesignServices'
import Build from '@mui/icons-material/Build'
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

import { useLocation, useNavigate } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  getBluePrintList,
  listMaterialsInStock,
} from '../../actions/materialActions'
import { useSelector } from 'react-redux'

import BluePrintModle from '../../components/BluePrintModle'
import { listProductName } from '../../actions/productActions'
import { createBlueprint } from '../../actions/bluePrintActions'
import { toast } from 'react-toastify'

const Material = () => {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const colors = tokens(theme.palette.mode)
  const [selectedRows, setSelectedRows] = useState([])
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [cost, setCost] = useState(0)

  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: materials,
  } = useQuery(['materialsIn', userInfo.token], listMaterialsInStock)


  const {
    isLoading: productIsLoading,
    isError: productIsError,
    error: productError,
    data: products,
  } = useQuery(['productNames', userInfo.token], listProductName)

  const {
    isLoading: isbLoading,
    isError: isBerror,
    error: berror,
    data: bluePrints,
  } = useQuery(['bluePrint'], getBluePrintList)

  const createMutation = useMutation(createBlueprint, {
    onSuccess: () => {
      queryClient.invalidateQueries('bluePrint')
      toast.success('BluePrint Created!')
      // navigate('/admin/outmaterial')
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
    content = materials
  }

  let bluePrintList
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    bluePrintList = bluePrints
  }

  const newProducts = products?.map((product) => product.name)

  const updateMaterial = () => {
    navigate('/admin/updateMaterial/' + selectedRows[0].material.id)
  }

  const addToBluprint = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
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

        {selectedRows.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => addToBluprint()}
          >
            <Build fontSize='small' />
            <span className='px-2'>Add to Blueprint Bucket</span>
          </Button>
        )}
      </GridToolbarContainer>
    )
  }

  const resetBlueprint = () => {
    localStorage.removeItem('bluePrintBucket')
    window.location.reload()
  }


  let bluePrintObject = {}
  let resources = {}

  bluePrintList?.forEach((element) => {
    resources[element.id] = element.bluePrintQty
  })

  bluePrintObject.name = keyword
  bluePrintObject.resources = resources

  const createBluePrint = () => {
    createMutation.mutate({ bluePrintObject, token: userInfo.token })
  }

  return (
    <Box>
      <Box m='20px 200px'>
        <Autocomplete
          fullWidth
          variant='filled'
          disablePortal
          id='combo-box-demo'
          options={newProducts}
          onChange={(event, value) => setKeyword(value)}
          sx={{ background: '#293040' }}
          renderInput={(params) => <TextField {...params} label='Products' />}
        />

        <Box margin='20px 0 20px'>
          {bluePrintList?.map((item, index) => (
            <Grid container>
              <Grid item xs={9} fontSize='25px'>
                {item.name}
              </Grid>
              <Grid item xs={1} fontSize='25px'>
                {item.costPrice} * {item.bluePrintQty}
              </Grid>
              <Grid item xs={2} fontSize='25px'>
                = {(item.costPrice * item.bluePrintQty).toFixed(2)} LKR
              </Grid>
            </Grid>
          ))}
        </Box>
        <hr />
        <Box margin='20px 0 20px'>
          <Grid container>
            <Grid item xs={9} fontSize='25px'>
              TOTAL MATERIAL COST
            </Grid>
            <Grid item xs={1} fontSize='25px'></Grid>
            <Grid item xs={2} fontSize='25px'>
              ={' '}
              {bluePrintList
                ?.reduce((acc, cv) => acc + cv.costPrice * cv.bluePrintQty, 0)
                .toFixed(2)}{' '}
              LKR
            </Grid>
          </Grid>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant='contained' color='secondary' onClick={createBluePrint}>
            Submit
          </Button>
          <Button variant='contained' color='error' onClick={resetBlueprint}>
            Reset
          </Button>
        </div>

        <Box
          m='40px 0 0 0'
          height='30vh'
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

        {selectedRows[0] && (
          <BluePrintModle
            onClick={addToBluprint}
            open={open}
            handleClose={handleClose}
            data={selectedRows[0]}
            // addToBucket = {() => addToBucket(data)}
          />
        )}
      </Box>
    </Box>
  )
}

export default Material
