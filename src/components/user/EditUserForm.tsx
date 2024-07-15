import { useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";

interface User {
  createdAt: string;
  email: string;
  id: string;
  userName: string;
}

const EditUserForm = ({ user }: { user: User }) => {
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [changePassword, setChangePassword] = useState(false);

  return (
    <main className="flex flex-col">
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
          <label className="text-sm mt-5">Confirme a nova senha</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="bg-transparent p-2 border border-teal-500 rounded-md"
          />
        </section>
      )}

      <button className="bg-teal-500 hover:bg-teal-400 transition-all rounded-md p-2 font-bold mt-7">
        Confirmar alterações
      </button>
    </main>
  );
};

export default EditUserForm;
