import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp.jsx';
import StudentCompleteProfile from './components/students/StudentCompleteProfile.jsx';
import AlumniCompleteProfile from './components/alumni/AlumniCompleteProfile.jsx';
import StudentDashboard from './components/students/studentDashboard/StudentDashboard.jsx';
import AlumniDashboard from './components/alumni/alumniDashboard/AlumniDashboard.jsx';
import AdminDashboard from './components/admin/adminDashboard/AdminDashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AlumniPermit from './components/admin/alumniPermit/AlumniPermit.jsx';
import StudentPermit from './components/admin/studentPermit/StudentPermit.jsx';
import AdminProfile from './components/admin/profile/AdminProfile.jsx';

const App = () =>{
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          
          


          <Route path='/Student/Profile/completion' element={<StudentCompleteProfile />} />
          <Route path='/alumni/profile/completion' element={<AlumniCompleteProfile />} />
          

          {/* STUDENT PANEL */}
          <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>

          <Route path='/student/dashboard' element={<StudentDashboard />} />
          
          </Route>

          {/* ALUMNI PANEL */}
          <Route element={<ProtectedRoute allowedRoles={['ALUMNI']} />}>

          <Route path='/alumni/dashboard' element={<AlumniDashboard />} />
          
          </Route>

          {/* ADMIN PANEL */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>

            <Route path='/admin/dashboard' element={<AdminDashboard />} />

            <Route path='/admin/admit/alumni' element={<AlumniPermit />} />

            <Route path='/admin/admit/student' element={<StudentPermit />} />

            <Route path='/admin/profile' element={<AdminProfile />} />

          </Route>
        </Routes>
        
      
      </BrowserRouter>
    </div>
  );
}

export default App;