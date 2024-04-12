import { Link } from "react-router-dom";

import { useAppSelector } from "../hooks";
import { selectUser } from "../store/userSlice";

function Header() {
  const user = useAppSelector(selectUser);

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link to="/" className="text-white hover:text-gray-200">
            Agridence Notes App
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="hover:underline text-white hover:text-gray-200"
              >
                Home
              </Link>
            </li>
            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="hover:underline text-white hover:text-gray-200"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  // onClick={logout}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
