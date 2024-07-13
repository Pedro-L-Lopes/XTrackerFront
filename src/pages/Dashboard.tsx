import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="flex justify-center items-center">
      <Link
        to="/habits"
        className="w-52 h-28 flex justify-center items-center bg-teal-700 hover:bg-teal-600 border border-teal-600 rounded-md text-2xl font-bold transition-all"
      >
        Hábitos
      </Link>
      <Link
        to="/user"
        className="w-52 h-28 flex justify-center items-center bg-teal-700 hover:bg-teal-600 border border-teal-600 rounded-md text-2xl font-bold transition-all"
      >
        Meu perfil
      </Link>
    </main>
  );
};

export default Dashboard;
