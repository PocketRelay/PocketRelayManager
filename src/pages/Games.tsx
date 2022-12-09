import { getGames } from "@api/routes";
import Game from "@components/game/Game";
import Loader from "@components/Loader";
import { useAppContext } from "@contexts/AppContext";
import { ReactNode } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Games() {
    const context = useAppContext();
    const { data, isLoading, error } = useQuery({
        queryKey: "games",
        queryFn: async () => {
            return await getGames(context);
        }
    });

    let content: ReactNode;

    if (isLoading) {
        content = <Loader />
    } else if (error || !data) {
        content = (
            <div>
                Failed to load games
            </div>
        )
    } else {
        console.log(data);
        content = (
            <div className="games__values">
                {data.games.map((game, index) => (
                    <Game game={game} key={index} />
                ))}
            </div>
        )
    }

    return (
        <div className="games">
            <div className="games__actions">
                <Link to="/" className="button">
                    Back
                </Link>
            </div>
            {content}
        </div>
    )
}