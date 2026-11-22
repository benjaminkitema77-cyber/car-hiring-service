import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/authorisation";

import Home from "./pages/home";
import Cars from "./pages/cars";
import CarDetail from "./pages/cardetail";
import Login from "./pages/login";
import Register from "./pages/register";
import Bookings from "./pages/bookings";
import Admin from "./pages/admin";

import ProtectedRoute from "./components/protectedroute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/cars" element={<Cars />} />

          <Route path="/cars/:id" element={<CarDetail />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;