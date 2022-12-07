import { Player, PlayerClass as PlayerClassModel } from "@api/models";
import { getPlayerClasses, updatePlayerClass } from "@api/routes";
import Loader from "@components/Loader";
import PlayerClass from "@components/PlayerClass";
import { AppContext, useAppContext } from "@contexts/AppContext";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
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

    const saveMutation = useMutation(save);

    async function save() {
        for (let i = 0; i < classes.length; i++) {
            const original: PlayerClassModel = classes[i];
            const newModel: PlayerClassModel = await updatePlayerClass(
                context,
                player,
                original.index,
                original.level,
                original.promotions
            );
            classes[i] = newModel;
        }
    }


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

    return (
        <div className="classes">
            <div className="classes__actions">
                <button className="button" onClick={reload} >Reload</button>
                <button className="button" onClick={() => saveMutation.mutate()}>Save</button>
            </div>
            {saveMutation.isLoading && (
                    <div>
                        Saving classess
                    </div>
                )}

                {saveMutation.isError && (
                    <div>
                        Failed to save classes
                    </div>
                )}
            <div className="classes__values">
                {classes.map((playerClass, index) => (
                    <PlayerClass key={index} playerClass={playerClass} />
                ))}
            </div>
        </div>
    )
}