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
          <Route
            path="/habits"
            element={auth ? <Habits /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/habits" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/habits" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
