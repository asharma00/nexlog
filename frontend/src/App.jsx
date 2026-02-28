import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import View from './pages/View'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Create from './pages/Create'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/view/:blogId' element={ <View/> } />
          <Route path='/profile/:userId' element={ <Profile/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/create' element={ <Create mode='create' /> } />
          <Route path="/edit/:blogId" element={<Create mode='edit' />} />
        </Routes>
      </div>
    </>
  )
}

export default App
