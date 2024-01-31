import React from 'react';
import {Routes,Route} from "react-router-dom";
import './App.css';
// import Homepage from './Components/Homepage/Homepage'
import Login from './Components/Login/Login'
// import Homepage from './Components/Homepage/Homepage';
import RegisterPage from './Components/Register/Register';
import {UserContextProvider} from './UserContext';
import Layout from './Layout';
import Homepage from './Components/Homepage/Homepage';
function App(){
  return (
    <UserContextProvider>
   <Routes>
   <Route path={'/'} element={<Layout/>}>
  <Route index element={<Homepage/>}/>
    <Route path={'/register'} element={<RegisterPage/>}/>
    <Route path={'/login'} element={<Login/>}/>
    </Route>
   </Routes>
   </UserContextProvider>
  )
}
export default App
