import { useRouts } from "./routs";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Header } from "./components/Header";

function App() {
  const { token, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routs = useRouts(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <BrowserRouter>
        <Header />
        <div className="container">{routs}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
