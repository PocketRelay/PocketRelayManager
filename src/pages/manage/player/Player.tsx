import { useState } from "react";
import { useQuery } from "react-query";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom"
import { Player as PlayerModel } from "@api/models";
import { getPlayer } from "@api/routes";
import Loader from "@components/Loader";
import { useAppContext } from "@contexts/AppContext";
import Inventory from "./Inventory";
import "./Player.scss";
import Classes from "./Classes";
import Basic from "./Basic";

type PlayerParams = {
    id?: string
}

export default function Player() {
    const context = useAppContext();
    const { id } = useParams<PlayerParams>();
    const [player, setPlayer] = useState<PlayerModel>(null!);
    const { isLoading, error, refetch } = useQuery({
        queryKey: ["player", id],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            if (!id) {
                throw [400, "Missing Player ID"];
            }

            const player = await getPlayer(context, id);
            setPlayer(player);
        }
    });

    if (isLoading || !player) {
        return <Loader />
    }

    if (error) {
        return <Navigate to="/players" />
    }

    async function reload() {
        setPlayer(null!);
        await refetch();
    }

    return (
        <div className="player">
            <div className="player__nav">
                <Link to="/players" className="button">
                    Back
                </Link>
                <button className="button" onClick={reload}>
                    Reload
                </button>
                <Link to="./" className="button">
                    Base
                </Link>
                <Link to="inventory/characters" className="button">
                    Inventory
                </Link>
                <Link to="classes" className="button">
                    Classes
                </Link>
            </div>


            <Routes>
                <Route index path="/" element={<Basic player={player} setPlayer={setPlayer} />} />
                <Route path="/classes" element={<Classes player={player} />} />
                <Route path="/inventory/*" element={<Inventory player={player} setPlayer={setPlayer} />} />
            </Routes>

        </div>
    )
}