import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlice";
import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { BiX } from "react-icons/bi";
import EditUserForm from "./EditUserForm";

interface User {
  createdAt: string;
  email: string;
  id: string;
  userName: string;
}

const UserDetails = () => {
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
    <main className="flex flex-col items-center justify-center p-10 border border-teal-500 rounded-md w-72 mt-16">
      {user && (
        <>
          <div className="flex items-center justify-center bg-teal-500 w-36 h-36 rounded-3xl">
            <h1 className="font-bold text-6xl text-white">{firstChar}</h1>
          </div>
          <article className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col justify-center">
              <label htmlFor="userName" className="font-semibold ">
                Nome de usuário
              </label>
              <p id="userName" className="text-lg">
                {user.userName}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="email" className="font-semibold ">
                Email
              </label>
              <p id="email" className="text-lg">
                {user.email}
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
            <Dialog.Root>
              <Dialog.Trigger className="bg-teal-500 hover:bg-teal-400 transition-all rounded-md p-2">
                Editar dados
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
                <Dialog.Content className="absolute p-10 bg-zinc-900 bg-opacity-75 rounded-2xl w-full max-w-md top-3.5 left-1/2 -translate-x-1/2 overflow-y-auto custom-scrollbar">
                  <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
                    <BiX size={24} aria-label="Fechar" />
                  </Dialog.Close>
                  <Dialog.Title className="text-2xl leading-tight font-extrabold">
                    Editar dados
                  </Dialog.Title>
                  <EditUserForm user={user} />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </article>
        </>
      )}
    </main>
  );
};

export default UserDetails;
