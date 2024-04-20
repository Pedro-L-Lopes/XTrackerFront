import { Link } from "react-router-dom";

import { useState, useEffect, FormEvent } from "react";
import { UseSelector, useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { registerUser, reset } from "../../slices/authSlice";

type Props = {};

const Register = (props: Props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

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
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Cadastrar</button>
      </form>
    </main>
  );
};

export default Register;
