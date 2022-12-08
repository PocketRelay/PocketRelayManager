import { useAppContext } from "@contexts/AppContext";
import Games from "@pages/Games";
import Home from "@pages/Home";
import Initialize from "@pages/Initialize";
import Login from "@pages/Login";
import Player from "@pages/player/Player";
import Players from "@pages/Players";
import { Route, Routes } from "react-router-dom";

function App() {
  const { serverState, token } = useAppContext();

  // If missing server details prompt server url
  if (!serverState) {
    return <Initialize />
  }

  // If missing token prompt for authentication
  if (!token) {
    return <Login />
  }

  return (
    <div className="full-size">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/players">
          <Route index element={<Players />} />
          <Route path=":id/*" element={<Player />} />
        </Route>
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  )

}

export default App;
