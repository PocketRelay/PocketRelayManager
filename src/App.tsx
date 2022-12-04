import { useAppContext } from "./contexts/AppContext";
import Initialize from "./pages/Initialize";
import Login from "./pages/Login";

function App() {
  const { serverState, token } = useAppContext();

  if (serverState == null) {
    return <div className="root">
      <Initialize />
    </div>
  } else if (token == null) {
    return <div className="root">
      <Login serverState={serverState} />
    </div>
  }

  return (
    <div className="root">
      <h1>Home</h1>
    </div>
  );
}

export default App;
