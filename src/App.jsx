import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './pages/Admin'
import User from './pages/User'
import { ThemeProvider } from "@/context/ThemeContext"
import { useUser } from './context/UserContext'
import Sales from './pages/Sales'

const App = () => {
  const { userInfo } = useUser();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {userInfo ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/users' element={<User />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Login />} />
          </>
        )}
      </Routes>
    </ThemeProvider >
  )
}

export default App