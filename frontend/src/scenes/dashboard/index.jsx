import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrafficIcon from '@mui/icons-material/Traffic'
import StatBox from '../../components/StatBox'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AdminHeader from '../../components/AdminHeader'
import { useQuery } from 'react-query'
import {
  letestTransactions,
  totalCost,
  totalCustomers,
  totalSales,
} from '../../actions/dashboardActions'

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()

  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [])

  const { data: salesTotal } = useQuery(
    ['salesTotal', userInfo.token],
    totalSales
  )

  const { data: customerCount } = useQuery(
    ['customerCount', userInfo.token],
    totalCustomers
  )

  const { data: cost } = useQuery(['totalCost', userInfo.token], totalCost)

  const {
    isLoading,
    isError,
    error,
    data: latestSales,
  } = useQuery(['latestSales', userInfo.token], letestTransactions)

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = latestSales
  }

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <AdminHeader title='DASHBOARD' subtitle='Welcome to your dashboard' />

        <Box></Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='140px'
        gap='20px'
      >
        {/* ROW 1 */}

        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={`${salesTotal ? salesTotal.totalSales : '0'}  LKR`}
            subtitle='Sales Obtained'
            progress='0.50'
            increase='+21%'
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={customerCount}
            subtitle='Total Customers'
            progress='0.30'
            increase='+5%'
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={`${cost ? cost.totalCost : '0'} LKR`}
            subtitle='Total Cost'
            progress='0.80'
            increase='+43%'
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn='span 12'
          gridRow='span 4'
          backgroundColor={colors.primary[400]}
          overflow='auto'
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p='15px'
          >
            <Typography color={colors.grey[100]} variant='h5' fontWeight='600'>
              Recent Transactions
            </Typography>
          </Box>
          {content.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              borderBottom={`4px solid ${colors.primary[500]}`}
              p='15px'
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant='h5'
                  fontWeight='600'
                >
                  {transaction.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.userName ? transaction.userName : 'user'}
                </Typography>
              </Box>
              <Box color={colors.grey[100]} textAlign='right'>
                {new Date(transaction.createdAt)
                  .toString()
                  .slice(0, 25)
                  .toString()}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p='5px 10px'
                borderRadius='4px'
              >
                {transaction.subTotal} LKR
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
