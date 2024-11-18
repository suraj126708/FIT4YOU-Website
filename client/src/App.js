import "./App.css";
import ContactUs from "./Pages/ContactUs";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Trainers from "./Pages/Trainers";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegisterPage";
import About from "./Pages/About";
import ProfilePage from "./Pages/Profile";
import WorkoutForm from "./Pages/AddWorkOut";
import UsersList from "./Pages/users";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Authorisation/AuthProvider";
import ProtectedRoute from "./Authorisation/ProtectedRoute";
import FaqPanel from "./Pages/FaqPanel";
import ForGotPassWord from "./Pages/ResetPassWord";
import { Navigate } from "react-router-dom";

function App() {
  const username = localStorage.getItem("loggedInUser");

  return (
    <div className="App">
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/ResetPassWord" element={<ForGotPassWord />} />

          {/* Protected Routes */}
          {/* FaqPanel and Users List are available only to 'dev jangam' */}
          {username === "dev jangam" && (
            <>
              <Route
                path="/faqPanel"
                element={
                  <ProtectedRoute>
                    <FaqPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {/* Other Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddWorkOut"
            element={
              <ProtectedRoute>
                <WorkoutForm />
              </ProtectedRoute>
            }
          />

          {username !== "dev jangam" && (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
