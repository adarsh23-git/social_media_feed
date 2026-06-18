import React from 'react'
import Login from './containers/Login'
import Register from './containers/Register'
import {Routes,Route} from 'react-router-dom'
import FrontPage from './containers/FrontPage'
import Create_post from './containers/Create_post'
import Feed from './containers/Feed'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<FrontPage/>} />
        <Route path='/create' element={<Create_post/>}   />
        <Route path='/posts' element={<Feed/>} />


      </Routes>
      
      
    </div>
  )
}

export default App
