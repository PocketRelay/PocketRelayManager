import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Link to="/players" className="home__button">
                <img src="" alt="" />
                <span>Players</span>
            </Link>

            <Link to="/games" className="home__button">
                <img src="" alt="" />
                <span>Games</span>
            </Link>
        </div>
    )
}