import React from 'react'
import { Badge, Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCartList } from '../../actions/cartAction'

const TopBar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
const navigate = useNavigate()
  const {
    isLoading,
    isError,
    data: cart,
  } = useQuery(['cart'], getCartList)

  let content
  if (isLoading) {
  } else if (isError) {
  } else {
    content = cart
  }

  let cartLength = 0
  if (content) {
    cartLength = content.length
  }

 
  const signOut = () => {
    localStorage.removeItem('userInfo')
    window.location.href = '/'
    
  }

  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      {/* SEARCH BAR */}
      <Box
        display='flex'
        backgroundColor={colors.primary[400]}
        borderRadius='3px'
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display='flex'>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        

        <Link to='/admin/cart'>
          <IconButton>
            <Badge badgeContent={cartLength} color='secondary'>
              <AddShoppingCart />
            </Badge>
          </IconButton>
        </Link>
        <IconButton onClick={signOut}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default TopBar
