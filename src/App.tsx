// Css
import "./styles/global.css";

// Libs
import "./lib/dayjs";

// Pages
import Habits from "./pages/Habits";

// Components
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Router
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Habits />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
