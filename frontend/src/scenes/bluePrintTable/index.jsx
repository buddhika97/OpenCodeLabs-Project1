import { Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
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

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { RemoveBlueprint, listBluePrints } from '../../actions/bluePrintActions'
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

const Material = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const queryClient = useQueryClient()
  const [selectedRows, setSelectedRows] = useState([])
  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: blueprints,
  } = useQuery(['bluePrintList', userInfo.token], listBluePrints)



  const deleteMutation = useMutation(RemoveBlueprint, {
    onSuccess: () => {
      queryClient.invalidateQueries('bluePrintList')
      toast.success('BluePrint Removed!')
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
    content = blueprints
  }


  const badgeCreate = (id) => {
    let feedback = prompt(
      'Enter Batch quantiy(should be lower than Maximum Products)?',
      ''
    )
    if (
      feedback &&
      !isNaN(feedback) &&
      feedback <= selectedRows[0].items &&
      feedback > 0
    ) {
      navigate(`/admin/mintbadge/${id}/${feedback}`)
    }
  }

  const removeBlueprint = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteMutation.mutate({ id: id, token: userInfo.token })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1.5 },

    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
    },
    {
      field: 'items',
      headerName: 'Maximum products',
      flex: 1,
    },
    {
      field: 'productId',
      headerName: 'productId',
      flex: 1,
    },
  ]

  let rows = content?.map((content) => ({
    id: content.id,
    name: content.productName,
    items: content.items,
    productId: content.productId,
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
            onClick={() => badgeCreate(selectedRows[0].id)}
          >
            <DesignServices fontSize='small' />
            <span className='px-2'>Create a new Batch </span>
          </Button>
        )}

        {selectedRows.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => removeBlueprint(selectedRows[0].id)}
          >
            <DeleteOutline fontSize='small' />
            <span className='px-2'>Remove Blueprint</span>
          </Button>
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <Box m='20px'>
      <AdminHeader title='BLUEPRINTS' subtitle='Managing Blueprints' />

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
