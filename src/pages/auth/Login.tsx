import { Link } from "react-router-dom";

import { useState, useEffect, FormEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { loginUser, reset } from "../../slices/authSlice";

const Register = () => {
  const [userName, setUserName] = useState("");
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
      password,
    };

    console.log(user);

    dispatch(loginUser(user));
  };

  if (error) {
    console.log(error);
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
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-black"
        />
        <button>Entrar</button>
      </form>
    </main>
  );
};

export default Register;
