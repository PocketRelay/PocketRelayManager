import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, Navigate, useParams } from "react-router-dom"
import { getPlayer, updatePlayer } from "../../../api/routes";
import Loader from "../../../components/Loader";
import { useAppContext } from "../../../contexts/AppContext";
import { encodeInventory, parseInventory } from "../../../inventory";
import Inventory from "./inventory/Inventory";
import "./Player.scss"

type PlayerParams = {
    id?: string
}

export default function Player() {
    const queryClient = useQueryClient();
    const context = useAppContext();
    const { id } = useParams<PlayerParams>();
    const [inventory, setInventory] = useState<number[]>([]);
    const { data, isLoading, error } = useQuery({
        queryKey: ["player", id],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            if (!id) {
                throw [400, "Missing Player ID"];
            }

            console.log("Fetched");
            const player = await getPlayer(context, id);
            setInventory(parseInventory(player.inventory));
            console.log("Inventory updated")
            return player;
        }
    });


    function reload() {
        queryClient.invalidateQueries({ queryKey: ["player", id] })
    }

    if (isLoading) {
        return <Loader />
    }

    const player = data;

    console.log(data);
    if (!player || error) {
        return <Navigate to="/players" />
    }

    async function saveInventory(): Promise<void> {
        if (!player) return;
        try {
            let value = encodeInventory(inventory);
            console.log(value);
            let _ = await updatePlayer(context, player.id, {
                inventory: value
            });
            player.inventory = value;
        } catch (e) {
            alert("Failed to save inventory");
        }
    }


    return (
        <div className="player">
            <Link to="/players" className="button">
                Back
            </Link>
            <button className="button" onClick={reload}>
                Reload
            </button>
            <div className="player__fields">
                <label className="input">
                    <span className="input__name">Display Name</span>
                    <input
                        className="input__value"
                        type="text"
                        alt="Username"
                        value={player.display_name}
                        onChange={() => { }}
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
                        onChange={() => { }}
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
                        onChange={() => { }}
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
                        onChange={() => { }}
                        alt="Origin"
                        placeholder=""
                        name="origin"
                    />
                </label>
            </div>



            <Inventory inventory={inventory} saveInventory={saveInventory} />
        </div>
    )
}