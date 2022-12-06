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

            <Inventory inventory={inventory} saveInventory={saveInventory} />
        </div>
    )
}