// Hooks
import { useState, createElement } from "react";

// Icons
import { Link } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { LiaDumbbellSolid } from "react-icons/lia";
import { MdOutlineDashboard } from "react-icons/md";
import { BsClipboardData, BsGraphUpArrow } from "react-icons/bs";

const Home = () => {
  const menus = [
    { name: "Meu perfil", link: "/", icon: AiOutlineUser },
    { name: "dashboard", link: "/", icon: MdOutlineDashboard, margin: true },
    { name: "Hábitos", link: "/", icon: BsClipboardData },
    { name: "Tarefas", link: "/", icon: BiTask },
    { name: "Treinos", link: "/", icon: LiaDumbbellSolid },
    { name: "Finanças", link: "/", icon: BsGraphUpArrow },
    { name: "Configurações", link: "/", icon: RiSettings4Line, margin: true },
    { name: "Sair", link: "/", icon: CiLogout },
  ];
  const [open, setOpen] = useState(false);
  return (
    <section className="flex gap-6 fixed">
      <div
        className={`bg-zinc-900 min-h-screen ${
          open ? "w-52" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md transition-all duration-300`}
            >
              <div>{createElement(menu?.icon, { size: "20" })}</div>
              <h2
                className={`whitespace-pre ${
                  !open && "opacity-0 translate-x-[-10px] pointer-events-none"
                } transition-all duration-300`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
