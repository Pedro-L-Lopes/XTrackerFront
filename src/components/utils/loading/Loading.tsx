import logo from "../../../assets/Logo.svg";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <img src={logo} alt="Logo" className="loading-image" />
      </div>
    </div>
  );
};

export default Loading;
