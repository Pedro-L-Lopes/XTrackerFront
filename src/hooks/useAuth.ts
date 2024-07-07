// Hooks
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Cookkies
import Cookies from "js-cookie";

export const useAuth = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwtToken = Cookies.get("token");

    if (jwtToken && user.expiration && new Date(user.expiration) > new Date()) {
      setAuth(true);
    } else {
      Cookies.remove("token");
      Cookies.remove("id");
      localStorage.removeItem("user");
      localStorage.removeItem("reload");
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading, user };
};
