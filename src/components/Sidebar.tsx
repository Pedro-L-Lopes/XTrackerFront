// Hooks
import { useState, createElement } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { CiLogout } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";

// Redux
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout, reset } from "../slices/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const menus = [
    // { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    {
      name: "Hábitos",
      link: "/XTrackerFront/",
      icon: BsClipboardData,
      margin: true,
    },
    // { name: "Tarefas", link: "/task", icon: BiTask },
    { name: "Meu perfil", link: "/XTrackerFront/user", icon: AiOutlineUser },
    // { name: "Treinos", link: "/", icon: LiaDumbbellSolid },
    // { name: "Finanças", link: "/", icon: BsGraphUpArrow },
    // {
    //   name: "Configurações",
    //   link: "/config",
    //   icon: RiSettings4Line,
    //   margin: true,
    // },
    {
      name: "Sair",
      link: handleLogout,
      icon: CiLogout,
      logout: true,
      margin: true,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <section className="flex gap-6 fixed z-10">
      <div
        className={`min-h-screen ${
          open ? "w-44 bg-zinc-900" : "w-16"
        } duration-500 text-gray-100 px-4 flex flex-col `}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div
          className={`mt-4 flex flex-col gap-4 relative ${
            !open ? "hidden" : ""
          }`}
        >
          {menus?.map((menu, i) => (
            <div
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:opacity-70 rounded-md transition-all duration-300 cursor-pointer animate-fadeIn ${
                menu?.margin && "mt-5"
              }`}
              onClick={() => {
                if (typeof menu.link === "function") {
                  menu.link();
                } else {
                  navigate(menu.link);
                }
              }}
            >
              <div>{createElement(menu?.icon, { size: "20" })}</div>
              <h2
                className={`whitespace-pre ${
                  !open && "opacity-0 translate-x-[-10px] pointer-events-none"
                } transition-all duration-300`}
              >
                {menu?.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
