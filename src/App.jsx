import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} user={user} logout={logout} />

      {/* MAIN CONTENT */}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/list" replace /> : <Home />}
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;