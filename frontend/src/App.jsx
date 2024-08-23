
import { Route, Router, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

import ForgotPassword from './pages/auth/ForgotPassword';
import SignUp from './pages/auth/SignUp';
import Login from "./pages/auth/Login";
import OtpVerificationForm from './pages/auth/OtpVerificationForm';
import ForgotChangePassword from "./pages/auth/ForgotChangePassword";
import HomePage from './pages/HomePage';

import { ToastContainer, toast } from "react-toastify";

import SideFeatureContainer from './components/common/SideFeatureContainer';

import SearchBarContainer from './constant/SearchBarContainer';

import Profile from './pages/Profile';

import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';


import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import EditProfile from './pages/profile/EditProfile';
import Temp from './pages/Temp';

import { AuthToken } from './redux/slices/Auth';
import SearchUser from './pages/messages/SearchUser';
import ChatPage from './pages/messages/ChatPage';

import Notification from './pages/notification/Notification';

// import Temp from "../"

function App() {


  const navigate = useNavigate();


  return (

    <div className='min-h-screen w-screen bg-black flex justify-center'>

      <ToastContainer />

      <div className='flex w-10/12 gap-7'>


        {

          !location.pathname.includes("auth") && <SideFeatureContainer></SideFeatureContainer>
          
        }


        <Routes>


          <Route path='/' element={<LandingPage></LandingPage>}></Route> 

          <Route path='/auth'>

            <Route path='auth-signup' element={<SignUp></SignUp>}></Route>

            <Route path='auth-login' element={<Login></Login>}></Route>

            <Route path='auth-forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>

            <Route path='auth-otpVerificationForm' element={<OtpVerificationForm></OtpVerificationForm>}></Route>

            <Route path='auth-ForgotChangePassword' element={<ForgotChangePassword></ForgotChangePassword>}></Route>

          </Route>


          <Route path='/Notification' element={<Notification></Notification>}></Route>

          <Route path='/temp' element={<Temp></Temp>}></Route>

          <Route path='/homepage' element={<HomePage></HomePage>}></Route>

          <Route path='/profile/:name' element={<Profile></Profile>}></Route>

          <Route path='/editProfile' element={<EditProfile></EditProfile>}></Route>
        
          <Route path='/messages' element={<SearchUser></SearchUser>}></Route>

          <Route path='/chatPage' element={<ChatPage></ChatPage>}></Route>
          

        </Routes>


      </div>

    </div>
  )
}

export default App



