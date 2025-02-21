import "./App.css";
import {Routes, Route, Navigate} from "react-router-dom";
import LandingHomePage from "./screens/home/home-landing-page";
import Register from "./components/login/login.components";
import UserAuthentication from "./hooks/user-authentication.hook";
import NotFound from "./screens/not-found/not-found.screen";
import Header from "./components/navbar/Navbar.component";
import Appointment from "./screens/appointment/Appointment";
import Services from "./screens/Services/Services.component";
import Doctor from "./screens/appointment/AppointmentDetails";
import Guarded from "./components/common/guarded-route/guarded-route.component";
import { UserRole } from "./types/type";
import PatientDashboard from "./screens/dashboard/PatientDashboard";
import DoctorDashboard from "./screens/dashboard/DoctorDashboard";
import FirstLoading from "./components/FirstLoading/FirstLoading.components";
import { useEffect, useState } from "react";
function App() {
  const { loggedInUser, handleAuthentication, handleLogout } = UserAuthentication();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(()=> {
      setLoading(false);
    },2000)
  }, []);
  if(loading){
    return <FirstLoading />
  }

  return (
    <>
      {loggedInUser && <Header handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            loggedInUser ? <LandingHomePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            loggedInUser ? (
              <Navigate to="/" />
            ) : (
              <Register onSubmit={handleAuthentication} />
            )
          }
        />
        <Route path="/appointment" element={ loggedInUser ? <Guarded roles={[UserRole.PATIENT]}><Appointment /></Guarded>: <Navigate to="/login" />} />
        <Route 
          path="/dashboard" 
          element={loggedInUser ? (
            loggedInUser.role === UserRole.PATIENT ? (
              <PatientDashboard />
            ) : (
              <DoctorDashboard />
            )
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="/services" element={ loggedInUser ? <Services />: <Navigate to="/login" />} />
        <Route path="/services/:id" element={loggedInUser ? <Guarded roles={[UserRole.DOCTOR]}><Doctor /></Guarded> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
