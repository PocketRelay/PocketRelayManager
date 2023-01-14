import { Player, PlayerUpdate } from "@api/models";
import { encodePlayerBase, parsePlayerBase, PlayerBase } from "@api/parser";
import { getPlayerData, setPlayerData, updatePlayer } from "@api/routes";
import { AppContext, useAppContext } from "@contexts/AppContext";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useAsync } from "react-use";

interface Properties {
    player: Player;
    setPlayer(player: Player): void;
}

export default function Basic({ player, setPlayer }: Properties) {
    const context: AppContext = useAppContext();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [origin, setOrigin] = useState(false);
    const [password, setPassword] = useState("");
    const [base, setBase] = useState<PlayerBase | null>(null);

    // Mutation state for saving the inventory
    const saveMutation = useMutation(save);

    useEffect(() => {
        setDisplayName(player.display_name);
        setEmail(player.email);
        setOrigin(player.origin);
    }, [player]);

    useAsync(async () => {
        const data = await getPlayerData(context, player.id, "Base");

        if (data.value != null) {
            const base = parsePlayerBase(data.value);
            if (base != null) {
                setBase(base);
                return;
            }
        }
        setBase(null);
    }, [player])

    async function save() {
        const update: PlayerUpdate = {};
        if (email != player.email) update.email = email;
        if (displayName != player.display_name) update.display_name = displayName;
        if (password.length > 0) update.password = password;
        if (origin != player.origin) update.origin = origin;

        if (Object.keys(update).length > 0) {
            console.log(update);
            const newPlayer = await updatePlayer(context, player.id, update);
            setPlayer(newPlayer);
        }

        if (base != null) {
            await setPlayerData(context, player.id, "Base", encodePlayerBase(base));
        }
    }


    function setCreditsEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let credits = parseInt(value);
        if (Number.isNaN(credits)) {
            credits = 0;
        }
        if (credits < 0) credits = 0;
        if (credits > 4294967296) credits = 4294967296;
        setBase(base => base != null ? ({
            ...base,
            credits,
        }) : null);
    }


    return (
        <div className="list__contents">
            <h1 className="list__contents__title">Basic</h1>
            <div className="list__contents__value list__contents list__contents--gap">
                <label className="input">
                    <span className="input__name">Display Name</span>
                    <input
                        className="input__value"
                        type="text"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                    />
                </label>
                <label className="input">
                    <span className="input__name">Email</span>
                    <input
                        className="input__value"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                {base != null && (

                    <label className="input">
                        <span className="input__name">Credits</span>
                        <input
                            className="input__value"
                            type="text"
                            value={base.credits}
                            onChange={setCreditsEvent}
                        />
                    </label>)}

                <label className="input">
                    <span className="input__name">Origin</span>
                    <input
                        className="input__value"
                        type="checkbox"
                        checked={origin}
                        onChange={() => setOrigin(origin => !origin)}
                    />
                </label>
                {(player.origin && !origin) && (
                    <p>
                        If you disable Origin on an Origin account in order to access it you will
                        need to set a password
                    </p>
                )}

                <label className="input">
                    <span className="input__name">Password</span>
                    <input
                        className="input__value"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <p>
                    If you don't want to change the account password ensure the password
                    field is left blank
                </p>

                <button className="button" onClick={() => saveMutation.mutate()}>Save</button>
            </div>
        </div>
    )
}