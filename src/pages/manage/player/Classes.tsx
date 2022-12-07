import { Player, PlayerClass as PlayerClassModel } from "@api/models";
import { getPlayerClasses } from "@api/routes";
import Loader from "@components/Loader";
import PlayerClass from "@components/PlayerClass";
import { AppContext, useAppContext } from "@contexts/AppContext";
import { useState } from "react";
import { useQuery } from "react-query";
import "./Classes.scss";

interface Properties {
    player: Player;
}

export default function Classes({ player }: Properties) {
    const context: AppContext = useAppContext();
    const [classes, setClasses] = useState<PlayerClassModel[]>([]);

    const { isLoading, error, refetch } = useQuery({
        queryKey: ["player_clases", player.id],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const classes: PlayerClassModel[] = await getPlayerClasses(context, player);
            setClasses(classes);
        }
    });


    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return (
            <div>
                Unable to load player classes
            </div>
        )
    }

    if (classes.length == 0) {
        return (
            <div>
                Player has no classes. This could be because this account
                hasn't be used with the Mass Effect 3 client yet.
            </div>
        )
    }

    async function reload() {
        setClasses([]);
        await refetch();
    }

    
    async function save() {
        
    }


    return (
        <div className="classes">
            {classes.map((playerClass, index) => (
                <PlayerClass key={index} playerClass={playerClass} />
            ))}
        </div>
    )
}