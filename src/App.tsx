// Css
import "./styles/global.css";

// Libs
import "./lib/dayjs";

// Pages
// import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
// import ToDo from "./pages/ToDo";
import User from "./pages/user/User";
import EditUser from "./pages/user/EditUser";

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
          {/* <Route path="/" element={!auth ? <Home /> : <Navigate to="/" />} /> */}
          {/* Auth */}
          <Route
            path="/XTrackerFront/register"
            element={!auth ? <Register /> : <Navigate to="/XTrackerFront/" />}
          />
          <Route
            path="/XTrackerFront/login"
            element={!auth ? <Login /> : <Navigate to="/XTrackerFront/" />}
          />
          {/* Pages auth */}
          {/* <Route
            path="/dashboard"
            element={auth ? <Dashboard /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/XTrackerFront/"
            element={auth ? <Habits /> : <Navigate to="/XTrackerFront/login" />}
          />
          {/* <Route
            path="/task"
            element={auth ? <ToDo /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/XTrackerFront/user"
            element={auth ? <User /> : <Navigate to="/XTrackerFront/login" />}
          />
          <Route
            path="/XTrackerFront/user/edit"
            element={
              auth ? <EditUser /> : <Navigate to="/XTrackerFront/login" />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
