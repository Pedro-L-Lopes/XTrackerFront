// Image
import logo from "../assets/Logo.svg";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-2 mt-5 opacity-30">
      <div className="flex items-center justify-center cursor-pointer">
        <img src={logo} alt="logo" className="w-7" />
        <p>© 2024 XTracker</p>
      </div>
      <p className="cursor-pointer">Terms</p>
      <p className="cursor-pointer">Contact</p>
      <p className="cursor-pointer">Docs</p>
      <p className="cursor-pointer">Manage</p>
      <p className="cursor-pointer">Cookies</p>
    </footer>
  );
};

export default Footer;
