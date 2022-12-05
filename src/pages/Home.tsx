import { useAppContext } from "../contexts/AppContext";

export default function Home() {
   
    const { setToken, serverState } = useAppContext();

    function logout(): void {
        setToken(null);
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <h1>Home</h1>
        </div>
    )
}