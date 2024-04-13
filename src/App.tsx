import { Outlet, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Notes from "./pages/Notes";

import Header from "./components/Header";
import AuthState from "./components/AuthState";
import RequireAuth from "./components/RequireAuth";

import { useAppSelector } from "./hooks";

import { selectUser } from "./store/userSlice";

import "./App.css";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Header />
      <Routes>
        {!user ? <Route path="/login" element={<Login />} /> : null}
        <Route
          element={
            <>
              <AuthState />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<Notes />} /> {/*handled by AuthState */}
          <Route
            path="/notes"
            element={
              // protected route
              <RequireAuth>
                <Notes />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
