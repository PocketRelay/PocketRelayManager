import { Link, Navigate, useParams } from "react-router-dom"
import { useAsync } from "react-use";
import { getPlayer } from "../../../api/routes";
import Loader from "../../../components/Loader";
import { useAppContext } from "../../../contexts/AppContext";

export default function Player() {
    const context = useAppContext();
    const { id } = useParams();
    let state = useAsync(async () => {
        if (!id) {
            console.log("Missing id")
            throw [404, "Missing player ID"]
        }
        const playerId = parseInt(id);
        if (Number.isNaN(playerId)) {
            console.log("Nan")
            throw [404, "Not player ID"]
        }
        let player = await getPlayer(context, playerId);
        return player;
    }, [id]);
    let player = state.value;

    if (state.loading) {
        return <Loader />
    }

    console.log(player);
    if (!player || state.error) {
        return <Navigate to="/players" />
    }

    return (
        <div>
             <Link to="/players" className="button">
                        Back
                    </Link>
            <h1>Player {player.display_name}</h1>
        </div>
    )
}