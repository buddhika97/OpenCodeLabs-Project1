import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getInvoiceData } from '../actions/salesActions'

const Invoice = () => {
  const { id } = useParams()

  // const users = useSelector((state) => state.userLogin)
  // const { userInfo } = users

  const {
    isLoading,
    isError,
    error,
    data: invoiceData,
  } = useQuery(['invoice', id], getInvoiceData)

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = invoiceData
  }

  console.log(content)
  const element = document.createElement('div')
  element.id = 'test'
  document.body.appendChild(element)

  return (
    <Container>
      <Typography variant='h5' textAlign='center' marginTop='5%'>
        Invoice
      </Typography>
      <Box display='flex' justifyContent='space-between'>
        <Box marginBottom='2%'>
          <h3>From:</h3>
          <p>
            Sandella Furniture,
            <br />
            Nawala Road Nugegoda,
            <br />
            Sri Lanka
          </p>
          <p>Hotline: +94 11 2809015</p>
        </Box>
        <Box marginBottom='2%' marginRight='5%'>
          <h3>To:</h3>
          <p>
            {content.customer.name}
            <br />
            {content.customer.address}
          </p>
        </Box>
      </Box>
      <Box marginBottom='2%'>
        <h3>Invoice No:</h3>
        <p>
          {content.sale.id}
          <br />
        </p>
      </Box>

      <Table id='myId'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.salesItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price} LKR</TableCell>
              <TableCell>{item.quantity * item.price} LKR</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{content.sale.total}LKR</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>{new Date().toString()}</p>
      <Box textAlign='center'>
        {' '}
        &copy; Open Code Labs - {new Date().toString().slice(10, 15)}
      </Box>
    </Container>
  )
}

export default Invoice
