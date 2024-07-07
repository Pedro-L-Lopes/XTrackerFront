// Hooks
import { useEffect, useState } from "react";

// Redux
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserDetails } from "../slices/userSlice";
import dayjs from "dayjs";

const Config = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: any) => state.user);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setEmail(user.email);
    }
  }, [user]);

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold text-gray-600">
        Carregando...
      </p>
    );
  }

  return (
    <main className="flex items-center justify-center gap-10 p-10">
      {user && (
        <>
          <article className="flex flex-col gap-4">
            <div className="flex flex-col justify-center">
              <label htmlFor="userName" className="font-semibold">
                Nome de usuário
              </label>
              <input
                id="userName"
                className="text-lg border-2 bg-transparent border-gray-300 rounded p-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                className="text-lg bg-transparent border-2 border-gray-300 rounded p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </article>
        </>
      )}
    </main>
  );
};

export default Config;
