import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Notes from "./pages/Notes";

import Header from "./components/Header";
import AuthState from "./components/AuthState";
import RequireAuth from "./components/RequireAuth";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthState />}>
          {["/", "/notes"].map((path) => (
            <Route
              path={path}
              element={
                <RequireAuth>
                  <Notes />
                </RequireAuth>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
