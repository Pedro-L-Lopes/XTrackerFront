import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export const useAuth = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwtToken = Cookies.get("token");

    if (jwtToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading, user };
};
