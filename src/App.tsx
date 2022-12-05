import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import RequireAuth from "./components/RequireAuth";
import { useAppContext } from "./contexts/AppContext";
import Manage from "./pages/manage/Manage";
import Initialize from "./pages/Initialize";
import Login from "./pages/Login";

function App() {
  const { loading } = useAppContext();
  if (loading) {
    return <Loader />
  } else {
    return (
      <div className="root">
        <Routes>
          <Route path="/init" element={<Initialize />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RequireAuth>
              <Manage />
            </RequireAuth>
          }/>
        </Routes>
      </div>
    )
  }
}

export default App;
