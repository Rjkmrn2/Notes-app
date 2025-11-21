import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
const routes=(
  <Router>
    <Routes>
      <Route path="/dashboard" exaxt element={<Home/>}/>
      <Route path="/login" exaxt element={<Login/>}/>
      <Route path="/signup" exaxt element={<SignUp/>}/>
    </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>
};

export default App