// Css
import "./styles/global.css";

// Libs
import "./lib/dayjs";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import User from "./pages/user/User";

// Components
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <BrowserRouter>
        {auth && <Sidebar />}
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={!auth ? <Home /> : <Navigate to="/dashboard" />}
          />
          {/* Auth */}
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/dashboard" />}
          />
          {/* Pages auth */}
          <Route
            path="/dashboard"
            element={auth ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/habits"
            element={auth ? <Habits /> : <Navigate to="/login" />}
          />
          <Route
            path="/user"
            element={auth ? <User /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
