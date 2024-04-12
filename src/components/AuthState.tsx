import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";

import { selectUser, setUser } from "../store/userSlice";

function AuthState() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xs p-8 bg-white shadow-md rounded text-center">
          <h2 className="text-lg mb-4">You are not logged in</h2>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-4 py-2 w-full rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <p>
      Welcome {user}!{" "}
      <button
        onClick={() => {
          dispatch(setUser(null));
          navigate("/");
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export default AuthState;
