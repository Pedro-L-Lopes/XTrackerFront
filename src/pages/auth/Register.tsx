import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect, FormEvent } from "react";
import { UseSelector, useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { registerUser, reset } from "../../slices/authSlice";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state: any) => state.auth);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      userName,
      email,
      password,
    };

    console.log(user);

    dispatch(registerUser(user));
    navigate("/");
  };

  if (error) {
    return <p>{error}</p>;
  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className="text-black"
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="text-black"
        />
        <input
          type="text"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-black"
        />
        <button>Cadastrar</button>
      </form>
      <Link to="/login">Já tem conta? clique aqui</Link>
    </main>
  );
};

export default Register;
