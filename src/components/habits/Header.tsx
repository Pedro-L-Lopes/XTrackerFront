// Images
import logo from "../../assets/Logo.svg";

// Icons
import { BiPlus } from "react-icons/bi";

const Header = () => {
  return (
    <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <img src={logo} alt="XTracker logo" />
      <button className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600  focus:ring-offset-background">
        <BiPlus size={20} className="text-violet-500" />
        Novo Hábito
      </button>
    </div>
  );
};

export default Header;
