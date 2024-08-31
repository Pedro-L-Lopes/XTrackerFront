// Hooks
import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser, reset } from "../../slices/authSlice";

// Components
import Message from "../../components/utils/message/Message";

// Icons
import { RiUser3Line, RiLockPasswordLine } from "react-icons/ri";
import { IoCheckmark } from "react-icons/io5";

// Images
import logo from "../../assets/Logo.svg";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      userName,
      email,
      password,
      confirmPassword,
    };
    dispatch(registerUser(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const isPasswordValid = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <main className="h-screen flex justify-center items-center gap-20 bg-background">
      <section className="flex flex-col items-center">
        <div className="fixed top-0 text-center">
          <img src={logo} alt="Logo XTracker" className="w-[50px]" />
        </div>
      </section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-teal-500">Crie sua conta</h1>
          <h2>Preencha os campos abaixo para se registrar</h2>
        </div>
        <div>
          <label
            className={`flex items-center bg-white bg-opacity-5 border rounded-md ${
              error && error.includes("usuário") ? "border-red-500" : ""
            }`}
          >
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
        </div>

        <label
          className={`flex items-center bg-white bg-opacity-5 border rounded-md ${
            error && error.includes("email") ? "border-red-500" : ""
          }`}
        >
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
        <label
          className={`flex items-center bg-white bg-opacity-5 border rounded-md ${
            error && error.includes("senha") ? "border-red-500" : ""
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
        <label
          className={`flex items-center bg-white bg-opacity-5 border rounded-md ${
            error && error.includes("senha") ? "border-red-500" : ""
          }`}
        >
          <RiLockPasswordLine className="ml-2" />
          <input
            type="password"
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="p-2 w-full flex bg-transparent placeholder:text-white outline-none"
            required
          />
        </label>

        <div className="text-xs -mt-2">
          <div className="flex justify-between">
            <div
              className={`flex items-center ${
                /[0-9]/.test(password) ? "text-teal-400" : "text-white"
              }`}
            >
              <IoCheckmark />
              <p>Um número</p>
            </div>
            <div
              className={`flex items-center ${
                /[A-Z]/.test(password) ? "text-teal-400" : "text-white"
              }`}
            >
              <IoCheckmark />
              <p>Uma letra maiúscula</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div
              className={`flex items-center ${
                /[a-z]/.test(password) ? "text-teal-400" : "text-white"
              }`}
            >
              <IoCheckmark />
              <p>Uma letra minúscula</p>
            </div>
            <div
              className={`flex items-center ${
                /[@$!%*?&]/.test(password) ? "text-teal-400" : "text-white"
              }`}
            >
              <IoCheckmark />
              <p>Um caractere especial</p>
            </div>
          </div>
          <div
            className={`flex text-xs ${
              isPasswordValid(password) ? "text-teal-400" : "text-white"
            }`}
          >
            <IoCheckmark />
            <p>Pelo menos 8 caracteres</p>
          </div>
        </div>

        <input
          type="submit"
          className="p-2 text-teal-500 text-lg font-bold bg-white bg-opacity-5 border rounded-md placeholder:text-white outline-none transition-all hover:text-white cursor-pointer"
          value={loading ? "AGUARDE" : "CADASTRAR"}
        />
        <div className="flex justify-between items-center">
          <Link
            to="/XTrackerFront/login"
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
