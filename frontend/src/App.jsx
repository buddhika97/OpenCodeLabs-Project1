import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductScreen from './pages/productScreen'

import DashboardRoutes from './DashboardRoutes'

function App() {
  return (
    <div >
      <Routes>
        <Route path='/admin/*' element={<DashboardRoutes />} />
        <Route path='/' element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path='/product/:id' element={<ProductScreen/>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
