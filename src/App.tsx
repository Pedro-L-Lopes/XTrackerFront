// Css
import "./styles/global.css";

// Libs
import "./lib/dayjs";

// Pages
import Habits from "./pages/Habits";

// Router
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Habits />
      </BrowserRouter>
    </div>
  );
}

export default App;
