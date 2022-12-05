import { ReactNode } from "react";
import Loader from "./components/Loader";
import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import Initialize from "./pages/Initialize";
import Login from "./pages/Login";

function App() {
  const { serverState, token, loading } = useAppContext();
  let content: ReactNode;
  if (loading) {
    content = <Loader />
  } else if (serverState == null) {
    content = <Initialize />
  } else if (token == null) {
    content = <Login serverState={serverState} />
  } else {
    content = <Home />
  }
  return (
    <div className="root">
      {content}
    </div>
  )
}

export default App;
