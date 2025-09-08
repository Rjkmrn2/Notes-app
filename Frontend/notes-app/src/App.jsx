import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
const routes=(
  <Router>
    <Routes>
      <Route path='/Dashboard' element={<Home/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
    </Routes>
  </Router>
);
export default function App() {
  return (
    <div>
      {routes}
    </div>
  );
}
