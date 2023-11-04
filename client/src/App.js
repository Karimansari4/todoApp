import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import NavBar from './Components/NavBar';
// import Protected from './Components/Protected';
import { jwtDecode } from "jwt-decode";
import AddTask from './Pages/AddTask';
import UpdateTask from './Components/UpdateTask';




function App() {

  const navigate = useNavigate()
  const token = localStorage.getItem('user-token')
  const [user, setUser] = useState('')
  const date = new Date()
  
  useEffect(() => {
    if(token){
      
      const decodedToken = jwtDecode(token)
      if(decodedToken.exp * 1000 < date.getTime()){
        localStorage.removeItem('user-token')
        navigate('/signin')
      }else{
        setUser(decodedToken)
        navigate('/')
      }
    }else{
      navigate('/signin')
    }
  }, [token])
  // console.log("user: ", user);
  return (
    <Fragment>
        {token ? <>
        <NavBar user={user.result} />
        <Routes>
          <Route path='/' element={ <Home user={user?.result}  />} />          
          <Route path='/addTask' element={ <AddTask user={user?.result}  />} />          
          <Route path='/udpate/:id' element={ <UpdateTask user={user?.result}  />} />          
        </Routes>
      </> : <>
        <Routes>
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/signup' element={ <SignUp /> } />
        </Routes>
      </>}
    </Fragment>
  );
}

export default App;
