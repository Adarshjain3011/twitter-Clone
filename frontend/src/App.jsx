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
import SideFeatureContainer from './components/common/SideFeatureContainer';
import SearchBarContainer from './constant/SearchBarContainer';
import ProtectedRoute from './utils/ProtectedRoute';


function App() {
  return (
    <div className='min-h-screen w-screen bg-black flex justify-center'>
      <ToastContainer />
      <div className='flex w-10/12 gap-7'>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth'>
            <Route path='auth-signup' element={<SignUp />} />
            <Route path='auth-login' element={<Login />} />
            <Route path='auth-forgotPassword' element={<ForgotPassword />} />
            <Route path='auth-otpVerificationForm' element={<OtpVerificationForm />} />
            <Route path='auth-ForgotChangePassword' element={<ForgotChangePassword />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/Notification' element={<Notification />} />
            <Route path='/temp' element={<Temp />} />
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/profile/:name' element={<Profile />} />
            <Route path='/editProfile' element={<EditProfile />} />
            <Route path='/messages' element={<SearchUser />} />
            <Route path='/chatPage' element={<ChatPage />} />
          </Route>
        </Routes>

      </div>
    </div>
  );
}

export default App;

