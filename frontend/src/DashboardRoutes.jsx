import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from './pages/MainPage'
import { ColorModeContext, colorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import TopBar from './scenes/global/TopBar'
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from './scenes/dashboard'
import Team from "./scenes/team";
import UserUpdateForm from "./scenes/userUpdateForm";
import Invoices from "./scenes/invoices";
import Customers from "./scenes/customers";
import CusterUpdateForm from './scenes/customerUpdateForm'
import Products from './scenes/products'
import OutProduct from './scenes/productOut'
import CreateProduct from './scenes/createProductForm'
import UpdateProduct from './scenes/productUpdateForm'

import Materials from './scenes/materials'
import OutMaterial from './scenes/materialOut'
import CreateMaterial from './scenes/createMaterialForm'
import UpdateMaterial from './scenes/materialUpdateForm'
import Grn from './scenes/grn'
import CreateGrn from './scenes/createGrnForm'

import BluePrint from './scenes/bluePrint'
import BluePrintList from './scenes/bluePrintTable'

import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar";
import Geography from './scenes/geomap'
import CreateCustomerForm from './scenes/customerCreateForm'

function DashboardRoutes() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <TopBar  />
            <Routes>
            <Route path = '/login' element = {<LoginPage />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/team' element={<Team />} />
            <Route path='/userupdate/:id' element={<UserUpdateForm />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/customerupdate/:id' element={<CusterUpdateForm/>} />
            <Route path='/createCustomer' element={<CreateCustomerForm/>} />
            <Route path='/product' element={<Products/>} />
            <Route path='/outproduct' element={<OutProduct/>} />
            <Route path='/createproduct' element={<CreateProduct/>} />
            <Route path= '/updateproduct/:id' element={<UpdateProduct/>} />

            <Route path='/material' element={<Materials/>} />
            <Route path='/outmaterial' element={<OutMaterial/>} />
            <Route path='/createMaterial' element={<CreateMaterial/>} />
            <Route path= '/updateMaterial/:id' element={<UpdateMaterial/>} />

            <Route path='/grn' element={<Grn/>} />
            <Route path='/creategrn' element={<CreateGrn/>} />

            <Route path ='/blueprint' element={<BluePrint/>} />
            <Route path = '/blueprintlist' element={<BluePrintList/>} />


            <Route path='/invoices' element={<Invoices />} />
            <Route path='/form' element={<Form />} />
            <Route path='/bar' element={<Bar />} />
            <Route path='/pie' element={<Pie />} />
            <Route path='/line' element={<Line />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/geography' element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default DashboardRoutes

