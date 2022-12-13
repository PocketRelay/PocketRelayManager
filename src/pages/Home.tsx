import { TOKEN_KEY, useAppContext } from "@contexts/AppContext";
import { Link } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const { setToken, serverState } = useAppContext();

    function logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null!);
    }

    return (
        <div className="list">
            <nav className="list__actions">
                <button onClick={logout} className="button">Logout</button>
                <Link to="/players" className="home__button button">
                    <img src="" alt="" />
                    <span>Players</span>
                </Link>

                <Link to="/games" className="home__button button">
                    <img src="" alt="" />
                    <span>Games</span>
                </Link>
            </nav>
            <div className="list__contents list__contents--gap home">
                <img className="home__logo" src="/assets/logo.svg"/>
                <h1 className="home__version">Pocket Relay Server</h1>
                <div className="home__attrs">
                <div className="home__attr">
                    <span className="home__attr__name">Version:</span>
                    <span className="home__attr__value">{serverState.version}</span>
                </div>
                <div className="home__attr">
                    <span className="home__attr__name">BaseURL:</span>
                    <span className="home__attr__value">{serverState.baseURL}</span>
                </div>
                </div>
            </div>
        </div>
    )
}