// Hooks
import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser, reset } from "../../slices/authSlice";

// Icons
import { RiUser3Line, RiLockPasswordLine } from "react-icons/ri";

// Icons
import logo from "../../assets/Logo.svg";

// Components
import Message from "../../components/message/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const { loading, error } = useSelector((state: any) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = { email, password };
    await dispatch(loginUser(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  console.log(error);

  return (
    <main
      className="h-screen flex justify-center items-center gap-20"
      style={{ backgroundImage: "linear-gradient(to right, #7c3aed, #472187)" }}
    >
      <section className="flex flex-col items-center">
        <div className="mr-8">
          <img src={logo} alt="Logo XTracker" className="w-[100px]" />
        </div>
        <div>
          <p className="text-4xl font-bold max-w-[500px]">
            Bem vindo ao XTracker <br /> Acompanhe seu progresso Tome o controle
            e evolua cada vez mais.
          </p>
        </div>
      </section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="mb-2">
          <h1 className="text-3xl font-bold">Já tem cadastro?</h1>
          <h2>Faça seu login e acompanhe seu progresso</h2>
        </div>

        <label
          className={`flex items-center bg-white bg-opacity-5 border rounded-md ${
            error && error.includes("Email") ? "border-red-500" : ""
          }`}
        >
          <RiUser3Line className="ml-2" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 w-full flex bg-transparent placeholder:text-white outline-none "
            required
          />
        </label>

        <label
          className={`flex items-center bg-white bg-opacity-5 border rounded-md ${
            error && error.includes("Senha") ? "border-red-500" : ""
          }`}
        >
          <RiLockPasswordLine className="ml-2" />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 w-full flex bg-transparent placeholder:text-white outline-none"
            required
          />
        </label>

        <input
          type="submit"
          className="p-2 mt-2 text-violet-500 text-lg font-bold bg-white border rounded-md placeholder:text-white outline-none transition-all hover:text-violet-700 cursor-pointer"
          value={loading ? "AGUARDE" : "ENTRAR"}
        />

        <div className="flex justify-between items-center">
          <Link
            to="/forget"
            className="opacity-80 hover:opacity-100 transition-all"
          >
            Esqueceu a senha?
          </Link>
          <Link
            to="/register"
            className="opacity-80 hover:opacity-100 transition-all"
          >
            Criar conta
          </Link>
        </div>
      </form>
      {error && <Message text={error} type={"error"} />}
    </main>
  );
};

export default Login;
