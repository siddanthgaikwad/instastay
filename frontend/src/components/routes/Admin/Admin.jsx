import "./Admin.css";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/UserContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { CSpinner } from "@coreui/react";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/api/admin-auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      console.log(res);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? (
    <Outlet />
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <CSpinner />
    </div>
  );
}
