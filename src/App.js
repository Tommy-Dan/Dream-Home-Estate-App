import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Offers from './pages/Offers';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
     <Router>
       <Navbar />
       <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/reset-password' element={<ResetPassword />}></Route>
        <Route path='/offers' element={<Offers />}></Route>
       </Routes>
     </Router>
    </>
  );
}

export default App;
