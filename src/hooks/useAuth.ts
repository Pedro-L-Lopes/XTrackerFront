import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.expiration && new Date(user.expiration) > new Date()) {
        setAuth(true);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("reload");
        setAuth(false);
      }
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading, user };
};
