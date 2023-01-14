import { Player } from "@api/models";
import { encodePlayerClass, parsePlayerClass, PlayerClass as PlayerClassModel } from "@api/parser";
import { getPlayerDataList, setPlayerData } from "@api/routes";
import Loader from "@components/Loader";
import PlayerClass from "@components/PlayerClass";
import { AppContext, useAppContext } from "@contexts/AppContext";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

interface Properties {
    player: Player;
}

export type PlayerClassData = {
    key: string;
} & PlayerClassModel

export default function Classes({ player }: Properties) {
    const context: AppContext = useAppContext();
    const [classes, setClasses] = useState<PlayerClassData[]>([]);

    const { isLoading, error, refetch } = useQuery({
        queryKey: ["player_clases", player.id],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const data = await getPlayerDataList(context, player.id);
            const keys = Object.keys(data);
            const classes: PlayerClassData[] = [];
            for (let key of keys) {
                if (key.startsWith("class")) {
                    const parsed = parsePlayerClass(data[key]);
                    if (parsed != null) {
                        classes.push({ key, ...parsed });
                    }
                }
            }

            setClasses(classes);
        }
    });

    const saveMutation = useMutation(save);

    async function save() {
        for (let i = 0; i < classes.length; i++) {
            const original: PlayerClassData = classes[i];
            const encoded = encodePlayerClass(original);
            await setPlayerData(context, player.id, original.key, encoded);
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

    async function reload() {
        setClasses([]);
        await refetch();
    }

    return (
        <div className="list__contents">
            <div className="list__contents__header">
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
            <div className="list__contents__value list__contents--rows">
                {classes.map((playerClass, index) => (
                    <PlayerClass key={index} playerClass={playerClass} />
                ))}
            </div>
        </div>
    )
}