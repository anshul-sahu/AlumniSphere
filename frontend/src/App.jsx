import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { Toaster } from "sonner";
import About from "./components/About";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AlumniDashboard from "./components/private/alumni/AlumniDashboard";
import StudentDashboard from "./components/private/student/StudentDashboard";
import AdminDashboard from "./components/private/admin/AdminDashboard";
import Alumni from "./components/private/admin/Alumni";
import Student from "./components/private/admin/Student";
import StudentViewProfile from "./components/private/student/StudentViewProfile";
import StudentEditProfile from "./components/private/student/StudentEditProfile";
import StudentCompleteProfile from "./components/auth/StudentCompleteProfile";
import AlumniCompleteProfile from "./components/auth/AlumniCompleteProfile";
import AlumniViewProfile from "./components/private/alumni/AlumniViewProfile";
import AlumniStudent from "./components/private/alumni/AlumniStudent";
import StudentAlumni from "./components/private/student/StudentAlumni";
import UploadInternship from "./components/private/alumni/UploadInternship";
import ViewInternship from "./components/private/student/ViewInternship";
import AlumniMyInternships from "./components/private/alumni/AlumniMyInternship";
function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="/SignIn" element={<SignIn/>} />
            <Route path="/About" element={<About/>} />

            <Route path="/alumni/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['ALUMNI']}>
                <AlumniDashboard />
              </ProtectedRoute>
            } />

            <Route path="/alumni/profile" 
            element={
              <ProtectedRoute allowedRoles={['ALUMNI']}>
                <AlumniViewProfile />
              </ProtectedRoute>
            } />
            <Route path="/alumni/students" 
            element={
              <ProtectedRoute allowedRoles={['ALUMNI']}>
                <AlumniStudent />
              </ProtectedRoute>
            } />
            <Route path="/alumni/internships" 
            element={
              <ProtectedRoute allowedRoles={['ALUMNI']}>
                <UploadInternship />
              </ProtectedRoute>
            } />
            <Route path="/alumni/uploadedIntern" 
            element={
              <ProtectedRoute allowedRoles={['ALUMNI']}>
                <AlumniMyInternships />
              </ProtectedRoute>
            } />

            <Route path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={'STUDENT'}>
                  <StudentDashboard/>
                </ProtectedRoute>
            }/>
            <Route path="/student/profile"
              element={
                <ProtectedRoute allowedRoles={'STUDENT'}>
                  <StudentViewProfile/>
                </ProtectedRoute>
            }/>
            <Route path="/student/edit"
              element={
                <ProtectedRoute allowedRoles={'STUDENT'}>
                  <StudentEditProfile/>
                </ProtectedRoute>
            }/>
            <Route path="/student/alumni"
              element={
                <ProtectedRoute allowedRoles={'STUDENT'}>
                  <StudentAlumni/>
                </ProtectedRoute>
            }/>
            <Route path="/student/internships"
              element={
                <ProtectedRoute allowedRoles={'STUDENT'}>
                  <ViewInternship/>
                </ProtectedRoute>
            }/>

            <Route path="/student/complete_profile" 
            element={<StudentCompleteProfile />} />

            <Route path="/alumni/complete_profile" 
            element={<AlumniCompleteProfile />} />
            
            <Route path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={'ADMIN'}>
                  <AdminDashboard/>
                </ProtectedRoute>
            }/>
            <Route path="/admin/Alumni"
              element={
                <ProtectedRoute allowedRoles={'ADMIN'}>
                  <Alumni/>
                </ProtectedRoute>
            }/>
            <Route path="/admin/students"
              element={
                <ProtectedRoute allowedRoles={'ADMIN'}>
                  <Student/>
                </ProtectedRoute>
            }/>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster richColors position="top-right" />
      
    </>
  )
}

export default App
