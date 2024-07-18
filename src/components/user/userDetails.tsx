import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface User {
  userId: string;
  createdAt: string;
  email: string;
  userName: string;
}

const UserDetails = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

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
    <main className="flex flex-col items-center justify-center p-10 border border-teal-500 rounded-md w-72 mt-16">
      {user && (
        <>
          <div className="flex items-center justify-center bg-teal-500 w-36 h-36 rounded-3xl">
            <h1 className="font-bold text-6xl text-white">{firstChar}</h1>
          </div>
          <article className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col justify-center">
              <label htmlFor="userName" className="font-semibold">
                Nome de usuário
              </label>
              <p id="userName" className="text-lg">
                {user.userName}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <p id="email" className="text-lg">
                {user.email}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="userCreateDate" className="font-semibold">
                Usuário desde
              </label>
              <p id="userCreateDate" className="text-lg">
                {userCreateDate}
              </p>
            </div>
            <button
              onClick={() => navigate(`/user/edit`)}
              className="bg-teal-500 hover:bg-teal-400 transition-all rounded-md p-2 mt-4"
            >
              Editar dados
            </button>
          </article>
        </>
      )}
    </main>
  );
};

export default UserDetails;
