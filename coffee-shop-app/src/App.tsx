import { createContext, useEffect, useState } from 'react'
import { AuthProvider } from './assets/Components/AuthContext';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CoffeeCreation from './assets/Components/CoffeeCreation/CoffeeCreation'
import Header from './assets/Components/Header/Header'
import Index from './assets/Components/Index/Index'
import Login from './assets/Components/Login/Login'
import Menu from './assets/Components/Menu/Menu'
import UserCreation from './assets/Components/User-Creation/UserCreation'
import axios from 'axios'


interface User{
  userId: number,
  username: string,
  password: string,
  role: "USER" | "ADMIN",
}
function App() {
  const [username, setUsername] = useState<string>('')
  // Using as const in Typescript gives us direct options for what we want the values to be
  const [role, setRole] = useState<"unauthenticated" | "USER" | "ADMIN">('unauthenticated')


  useEffect(()=>{
    // So whenever the page loads I want to send an axios request to make sure we're still logged in, if we are
    // we should have the proper nav bar and if we are we should also see "log out" as an option
    axios.get<User>('http://localhost:8081/users', {withCredentials: true})
    .then((res) => {
      setUsername(res.data.username)
      setRole(res.data.role)
    })
    .catch((err) => {
      console.log(err)
      // If we are NOT logged in, make sure it's set appropriately
      setUsername('')
      setRole('unauthenticated')
    })
  }, [])







  return (
   
    <AuthProvider>
    <Router>
      <Header /> {/* Header is always visible on all pages */}
      <Routes>
        <Route path="/" element={<Index/>} /> {/* Renders Index component for the home page */}
        <Route path="/login" element={<Login/>} /> {/* Renders Login component */}
        <Route path="/menu" element={<Menu/>} /> {/* Renders Menu component */}
        <Route path="/admin" element={<CoffeeCreation/>} /> {/* Renders CoffeeCreation component */}
        <Route path="/createaccount" element={<UserCreation/>} /> {/* Renders UserCreation component */}
      </Routes>
    </Router>
    </AuthProvider>
    
  )
}

export default App
