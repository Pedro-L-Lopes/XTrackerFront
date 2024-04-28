import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser, reset } from "../../slices/authSlice";
import Message from "../../components/message/Message";
import { RiUser3Line, RiLockPasswordLine } from "react-icons/ri";
import logo from "../../assets/Logo.svg";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = {
      userName,
      email,
      password,
    };
    dispatch(registerUser(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
          <h1 className="text-3xl font-bold">Crie sua conta</h1>
          <h2>Preencha os campos abaixo para se registrar</h2>
        </div>
        <label className="flex items-center bg-white bg-opacity-5 border rounded-md">
          <RiUser3Line className="ml-2" />
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="p-2 w-full flex bg-transparent placeholder:text-white outline-none"
            required
          />
        </label>
        <label className="flex items-center bg-white bg-opacity-5 border rounded-md">
          <RiUser3Line className="ml-2" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 w-full flex bg-transparent placeholder:text-white outline-none"
            required
          />
        </label>
        <label className="flex items-center bg-white bg-opacity-5 border rounded-md">
          <RiLockPasswordLine className="ml-2" />
          <input
            type="password"
            placeholder="Senha Ex: Senha476#"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 w-full flex bg-transparent placeholder:text-white outline-none"
            required
          />
        </label>

        <input
          type="submit"
          className="p-2 mt-2 text-violet-500 text-lg font-bold bg-white border rounded-md placeholder:text-white outline-none transition-all hover:text-violet-700 cursor-pointer"
          value={loading ? "AGUARDE" : "CADASTRAR"}
        />
        <div className="flex justify-between items-center">
          <Link
            to="/login"
            className="opacity-80 hover:opacity-100 transition-all"
          >
            Já tem uma conta? Faça login
          </Link>
        </div>
      </form>

      {error && <Message text={error} type={"error"} />}
    </main>
  );
};

export default Register;
