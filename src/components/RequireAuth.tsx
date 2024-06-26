import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../hooks";
import { selectUser } from "../store/userSlice";

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector(selectUser);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
