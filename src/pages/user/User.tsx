// Hooks
import { useEffect } from "react";

// Redux
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlice";
import dayjs from "dayjs";

const User = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: any) => state.user);

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
    <main className="flex items-center justify-center gap-10 p-10">
      {user && (
        <>
          <div className="flex items-center justify-center bg-violet-500 w-40 h-40 rounded-3xl mt-5">
            <h1 className="font-bold text-6xl text-white">{firstChar}</h1>
          </div>
          <article className="flex flex-col gap-4">
            <div className="flex flex-col justify-center">
              <label htmlFor="userName" className="font-semibold ">
                Nome de usuário
              </label>
              <p id="userName" className="text-lg">
                {user.userName}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="userCreateDate" className="font-semibold ">
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

export default User;
