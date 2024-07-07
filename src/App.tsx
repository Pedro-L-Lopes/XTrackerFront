// Css
import "./styles/global.css";

// Libs
import "./lib/dayjs";

// Pages
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import User from "./pages/user/User";
import Config from "./pages/Config";

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
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/habits"
            element={auth ? <Habits /> : <Navigate to="/login" />}
          />
          <Route
            path="/user"
            element={auth ? <User /> : <Navigate to="/login" />}
          />
          <Route
            path="/config"
            element={auth ? <Config /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
