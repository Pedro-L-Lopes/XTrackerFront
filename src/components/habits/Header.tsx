// Images
import logo from "../../assets/Logo.svg";

// Icons
import { BiPlus, BiX } from "react-icons/bi";

// Components
import * as Dialog from "@radix-ui/react-dialog";
import NewHabitForm from "./NewHabitForm";

const Header = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex justify-between items-center mt-10">
      <img src={logo} alt="XTracker logo" />

      <h2 className="opacity-75">Acompanhe seus hábitos</h2>

      <Dialog.Root>
        <Dialog.Trigger className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600  focus:ring-offset-background">
          <BiPlus size={20} className="text-violet-500" />
          Novo Hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-3.5 left-1/2 -translate-x-1/2 overflow-y-auto custom-scrollbar">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
              <BiX size={24} aria-label="Fechar" />
            </Dialog.Close>

            <Dialog.Title className="text-2xl leading-tight font-extrabold">
              Adicionar Hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Header;
