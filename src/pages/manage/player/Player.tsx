import { useQuery } from "react-query";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom"
import { useAsync } from "react-use";
import { AsyncState } from "react-use/lib/useAsyncFn";
import { Player as PlayerModel } from "../../../api/models";
import { getPlayer } from "../../../api/routes";
import Loader from "../../../components/Loader";
import { useAppContext } from "../../../contexts/AppContext";
import Inventory from "./inventory/Inventory";
import "./Player.scss"

type PlayerParams = {
    id?: string
}

export default function Player() {
    const context = useAppContext();
    const { id } = useParams<PlayerParams>();
    const { data, isLoading, error } = useQuery(["player", id], async () => {
        if (!id) {
            throw [400, "Missing Player ID"];
        }
        console.log("Fetched");
        return await getPlayer(context, id);
    });


    if (isLoading) {
        return <Loader />
    }

    const player = data;

    console.log(data);
    if (!player || error) {
        return <Navigate to="/players" />
    }

    return (
        <div className="player">
            <Link to="/players" className="button">
                Back
            </Link>
            <div className="player__fields">
            <label className="input">
                <span className="input__name">Display Name</span>
                <input
                    className="input__value"
                    type="text"
                    alt="Username"
                    value={player.display_name}
                    placeholder=""
                    name="username"
                />
            </label>
            <label className="input">
                <span className="input__name">Email</span>
                <input
                    className="input__value"
                    type="text"
                    alt="Email"
                    value={player.email}
                    placeholder=""
                    name="email"
                />
            </label>
            <label className="input">
                <span className="input__name">Credits</span>
                <input
                    className="input__value"
                    type="number"
                    alt="Credits"
                    value={player.credits}
                    placeholder=""
                    name="credits"
                />
            </label>
            <label className="input">
                <span className="input__name">Origin</span>
                <input
                    className="input__value"
                    type="checkbox"
                    checked={player.origin}
                    alt="Origin"
                    placeholder=""
                    name="origin"
                />
            </label>
            </div>
           
            

            <Inventory player={player}/>
        </div>
    )
}