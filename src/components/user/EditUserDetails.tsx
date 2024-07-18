// Hooks
import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Icons
import { TiArrowUnsorted } from "react-icons/ti";
import { IoArrowBackCircleOutline } from "react-icons/io5";
// Redux
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  patchUserDetails,
  getUserDetails,
  reset,
} from "../../slices/userSlice";
import { useSelector } from "react-redux";

interface UpdateUser {
  errorMessage?: string;
  userId: string;
  userName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const EditUserDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, error, loading, success } = useSelector(
    (state: any) => state.user
  );

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (
      changePassword &&
      (!currentPassword || !newPassword || !confirmNewPassword)
    ) {
      setMessage("Por favor, preencha todos os campos de senha.");
      return;
    }

    setMessage("");

    const updatedFields: Partial<UpdateUser> = {};

    if (userName !== user.userName) {
      updatedFields.userName = userName;
    }
    if (email !== user.email) {
      updatedFields.email = email;
    }
    if (changePassword) {
      if (currentPassword) {
        updatedFields.currentPassword = currentPassword;
      }
      if (newPassword) {
        updatedFields.newPassword = newPassword;
      }
      if (confirmNewPassword) {
        updatedFields.confirmNewPassword = confirmNewPassword;
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      setMessage("Nenhuma alteração foi feita.");
      return;
    }

    const data: UpdateUser = {
      userId: user.id,
      ...updatedFields,
    };

    dispatch(patchUserDetails(data));
  };

  useEffect(() => {
    if (error) {
      setMessage(error);
    }
  }, [error]);

  useEffect(() => {
    setTimeout(async () => {
      if (success) {
        navigate("/user");
        dispatch(reset());
      }
    }, 2000);
  }, [success, navigate]);

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold text-gray-600">
        Carregando...
      </p>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center mt-5">
      <Link
        to="/user"
        className="flex items-center bg-teal-500 hover:bg-teal-400 p-1 rounded-sm transition-all"
      >
        <IoArrowBackCircleOutline /> Voltar para o perfil
      </Link>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col justify-center w-1/3"
      >
        <label className="text-sm mt-5">Nome de usuário</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="bg-transparent p-2 border border-teal-500 rounded-md"
        />
        <label className="text-sm mt-5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent p-2 border border-teal-500 rounded-md"
        />
        <button
          type="button"
          onClick={() => setChangePassword((prev) => !prev)}
          className="flex items-center justify-center bg-teal-500 hover:bg-teal-400 transition-all rounded-md p-2 font-bold mt-7"
        >
          Mudar senha
          <TiArrowUnsorted />
        </button>

        {changePassword && (
          <section className="flex flex-col animate-fadeIn">
            <label className="text-sm mt-5">Senha atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-transparent p-2 border border-teal-500 rounded-md"
            />
            <label className="text-sm mt-5">Nova senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent p-2 border border-teal-500 rounded-md"
            />
            <label className="text-sm mt-5">Confirmar nova senha</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="bg-transparent p-2 border border-teal-500 rounded-md"
            />
          </section>
        )}

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-400 transition-all rounded-md p-2 font-bold mt-7"
        >
          Salvar alterações
        </button>

        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
        {success && (
          <p className="text-green-500 text-center mt-2">
            Atualização bem-sucedida!
          </p>
        )}
      </form>
    </main>
  );
};

export default EditUserDetails;
