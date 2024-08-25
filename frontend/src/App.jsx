import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import OtpVerificationForm from './pages/auth/OtpVerificationForm';
import ForgotChangePassword from './pages/auth/ForgotChangePassword';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import EditProfile from './pages/profile/EditProfile';
import Temp from './pages/Temp';
import SearchUser from './pages/messages/SearchUser';
import ChatPage from './pages/messages/ChatPage';
import Notification from './pages/notification/Notification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';

import Layout from './Layout';


function App() {
  return (
    <div className='min-h-screen w-screen bg-black flex justify-center'>
      <ToastContainer />
      <div className='flex w-10/12 gap-7'>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth'>
            <Route path='auth-signup' element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path='auth-login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='auth-forgotPassword' element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path='auth-otpVerificationForm' element={<PublicRoute><OtpVerificationForm /></PublicRoute>} />
            <Route path='auth-ForgotChangePassword' element={<PublicRoute><ForgotChangePassword /></PublicRoute>} />
          </Route>

          {/* Protected Routes */}
          {/* Protected Routes */}

          <Route element={<ProtectedRoute><Layout/></ProtectedRoute>} >


            <Route path='notification' element={<ProtectedRoute><Notification /></ProtectedRoute>} />
            <Route path='temp' element={<ProtectedRoute><Temp /></ProtectedRoute>} />
            <Route path='/profile/:name' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='editProfile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path='messages' element={<ProtectedRoute><SearchUser /></ProtectedRoute>} />
            <Route path='chatPage' element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

          </Route>

          <Route path='/homepage' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
