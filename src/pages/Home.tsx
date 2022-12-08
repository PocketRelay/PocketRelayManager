import { TOKEN_KEY, useAppContext } from "@contexts/AppContext";
import { Link } from "react-router-dom";

export default function Home() {
    const { setToken } = useAppContext();

    function logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null!);
    }

    return (
        <div>
            <button onClick={logout} className="button">Logout</button>
            <Link to="/players" className="home__button button">
                <img src="" alt="" />
                <span>Players</span>
            </Link>

            <Link to="/games" className="home__button button">
                <img src="" alt="" />
                <span>Games</span>
            </Link>
        </div>
    )
}