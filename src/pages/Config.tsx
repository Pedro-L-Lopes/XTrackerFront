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

  const handleSave = () => {
    //dispatch(updateUserDetails({ userName, email }));
  };

  const userCreateDate = user ? dayjs(user.createdAt).format("DD/MM/YYYY") : "";
  const firstChar =
    user && user.userName ? user.userName.charAt(0).toUpperCase() : "";

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
          <div className="flex items-center justify-center bg-violet-500 w-40 h-40 rounded-3xl mt-5">
            <h1 className="font-bold text-6xl text-white">{firstChar}</h1>
          </div>
          <article className="flex flex-col gap-4">
            <div className="flex flex-col justify-center">
              <label htmlFor="userName" className="font-semibold">
                Nome de usuário
              </label>
              <input
                id="userName"
                className="text-lg border-2 border-gray-300 rounded p-2"
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
                className="text-lg border-2 border-gray-300 rounded p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Salvar
            </button>
          </article>
          <article className="flex flex-col gap-4">
            <div className="flex flex-col justify-center">
              <label htmlFor="userCreateDate" className="font-semibold">
                Usuário desde
              </label>
              <p id="userCreateDate" className="text-lg">
                {userCreateDate}
              </p>
            </div>
          </article>
        </>
      )}
    </main>
  );
};

export default Config;
