// Css
import "./styles/global.css";

// Libs
import "./lib/dayjs";

// Pages
import Habits from "./pages/Habits";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

// Components
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div>
      <BrowserRouter>
        {auth && <Sidebar />}
        <Routes>
          {/* <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/"
            element={auth ? <Habits /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
