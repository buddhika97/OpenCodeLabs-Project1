import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import MonetizationOn from '@mui/icons-material/MonetizationOn'
import PointOfSale from '@mui/icons-material/PointOfSale'

import Warehouse from '@mui/icons-material/Warehouse'
import Factory from '@mui/icons-material/Factory'
import Input from '@mui/icons-material/Input'

import Key from '@mui/icons-material/Key'
import BuildCircle from '@mui/icons-material/BuildCircle'


import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')
  const users = useSelector((state) => state.userLogin)
  const { userInfo } = users

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [])

  return (
    <>
      {userInfo && (
        <Box
          sx={{
            '& .pro-sidebar-inner': {
              background: `${colors.primary[400]} !important`,
            },
            '& .pro-icon-wrapper': {
              backgroundColor: 'transparent !important',
            },
            '& .pro-inner-item': {
              padding: '5px 35px 5px 20px !important',
            },
            '& .pro-inner-item:hover': {
              color: '#868dfb !important',
            },
            '& .pro-menu-item.active': {
              color: '#6870fa !important',
            },
          }}
        >
          <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape='square'>
              {/* LOGO AND MENU ICON */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: '10px 0 20px 0',
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    ml='15px'
                  >
                    <Typography variant='h3' color={colors.grey[100]}>
                    SANDELLA
                    </Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb='25px'>
                  {/* <Box display='flex' justifyContent='center' alignItems='center'>
                 <img
                   alt='profile-user'
                   width='100px'
                   height='100px'
                   src={`../../assets/user.jpg`}
                   style={{ cursor: 'pointer', borderRadius: '50%' }}
                 />
               </Box> */}
                  <Box textAlign='center'>
                    <Typography
                      variant='h2'
                      color={colors.grey[100]}
                      fontWeight='bold'
                      sx={{ m: '10px 0 0 0' }}
                    >
                      {userInfo.name}
                    </Typography>
                    <Typography variant='h5' color={colors.greenAccent[500]}>
                      {userInfo.type}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/*Menu items */}

              <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                <Item
                  title='Dashboard'
                  to='/admin/'
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant='h6'
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  Sales
                </Typography>

                <Item
                  title='Products In Stock'
                  to='/admin/product'
                  icon={<Warehouse />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title='Customers Information'
                  to='/admin/customers'
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title='Sales'
                  to='/admin/sales'
                  icon={<MonetizationOn />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title='Sales by Item'
                  to='/admin/salesitems'
                  icon={<PointOfSale />}
                  selected={selected}
                  setSelected={setSelected}
                />

                {userInfo.type !== 'user' && (
                  <>
                  <Typography
                  variant='h6'
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  Materials
                </Typography>

                <Item
                  title='Material In Stock'
                  to='/admin/material'
                  icon={<Factory />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant='h6'
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  Stock Management & GRN
                </Typography>

                <Item
                  title='Mange Products'
                  to='/admin/outproduct'
                  icon={<Warehouse />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title='Manage Material'
                  to='/admin/outmaterial'
                  icon={<Warehouse />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title='GRN'
                  to='/admin/grn'
                  icon={<Input />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant='h6'
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  BluePrints
                </Typography>

                <Item
                  title='Blueprints'
                  to='/admin/blueprintlist'
                  icon={<Key />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title='Create BluePrint'
                  to='/admin/blueprint'
                  icon={<BuildCircle />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant='h6'
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  Users & Utility
                </Typography>

                <Item
                  title='Manage Team'
                  to='/admin/team'
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title='Calendar'
                  to='/admin/calendar'
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /></>
                  
                )}

                
              </Box>
              <Typography
                  variant='h6'
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                &copy; Open Code Labs - 2022
                </Typography>
            </Menu>
          </ProSidebar>
        </Box>
      )}
    </>
  )
}

export default Sidebar
