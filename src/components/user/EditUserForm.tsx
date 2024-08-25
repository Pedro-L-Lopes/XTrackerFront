import { FormEvent, useState, useEffect } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { patchUserDetails } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
  userId: string;
  createdAt: string;
  email: string;
  id: string;
  userName: string;
}

interface UpdateUser {
  errorMessage?: any;
  userId: string;
  userName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const EditUserForm = ({
  user,
}: // setShowDialog,
{
  user: User;
  setShowDialog: (open: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state: any) => state.user);

  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (
      changePassword &&
      (!currentPassword || !newPassword || !confirmNewPassword)
    ) {
      setFormError("Por favor, preencha todos os campos de senha.");
      return;
    }

    setFormError("");

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
      setFormError("Nenhuma alteração foi feita.");
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
      setFormError(error);
    }
  }, [error]);

  if (success) {
    navigate("/user");
  }

  return (
    <main>
      <form onSubmit={handleUpdate} className="flex flex-col">
        <label className="text-sm mt-5">Nome de usuário</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="bg-transparent p-2 border border-teal-500 rounded-md"
        />
        <label className="text-sm mt-5">Email</label>
        <input
          type="text"
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

        {formError && <p className="text-red-500">{formError}</p>}
        {success && <p className="text-green-500">Atualização bem-sucedida!</p>}

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-400 transition-all rounded-md p-2 font-bold mt-7"
        >
          Confirmar alterações
        </button>
      </form>
    </main>
  );
};

export default EditUserForm;
