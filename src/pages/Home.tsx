import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex justify-center items-center">
      <Link
        to="/habits"
        className="w-52 h-28 flex justify-center items-center bg-violet-700 hover:bg-violet-600 border border-violet-600 rounded-md text-2xl font-bold transition-all"
      >
        Hábitos
      </Link>
      <Link
        to="/user"
        className="w-52 h-28 flex justify-center items-center bg-violet-700 hover:bg-violet-600 border border-violet-600 rounded-md text-2xl font-bold transition-all"
      >
        Meu perfil
      </Link>
    </main>
  );
};

export default Home;
