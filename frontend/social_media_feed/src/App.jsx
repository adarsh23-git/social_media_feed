import React from 'react'
import Login from './containers/Login'
import Register from './containers/Register'
import {Routes,Route} from 'react-router-dom'





const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

      </Routes>
      
      
    </div>
  )
}

export default App
