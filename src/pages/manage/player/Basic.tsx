import { Player, PlayerUpdate } from "@api/models";
import { updatePlayer } from "@api/routes";
import { AppContext, useAppContext } from "@contexts/AppContext";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

import "./Basic.scss";

interface Properties {
    player: Player;
    setPlayer(player: Player): void;
}

export default function Basic({ player, setPlayer }: Properties) {
    const context: AppContext = useAppContext();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [credits, setCredits] = useState(0);
    const [origin, setOrigin] = useState(false);
    const [password, setPassword] = useState("");

    // Mutation state for saving the inventory
    const saveMutation = useMutation(save);

    useEffect(() => {
        setDisplayName(player.display_name);
        setEmail(player.email);
        setCredits(player.credits);
        setOrigin(player.origin);
    }, [player]);

    async function save() {
        const update: PlayerUpdate = {};
        if (email != player.email)  update.email = email;
        if (displayName != player.display_name)  update.display_name = displayName;
        if (password.length > 0)  update.password = password;
        if (credits != player.credits)  update.credits = credits;
        if (origin != player.origin)   update.origin = origin;

        console.log(update);
        const newPlayer = await updatePlayer(context, player.id, update);
        setPlayer(newPlayer);
    }

    return (
        <div className="basic">
            <h1>Basic</h1>
            <label className="input">
                <span className="input__name">Display Name</span>
                <input
                    className="input__value"
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    alt="Username"
                    placeholder=""
                    name="username"
                />
            </label>
            <label className="input">
                <span className="input__name">Email</span>
                <input
                    className="input__value"
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    alt="Username"
                    placeholder=""
                    name="username"
                />
            </label>
            <label className="input">
                <span className="input__name">Credits</span>
                <input
                    className="input__value"
                    type="text"
                    value={credits}
                    onChange={() => { }}
                    alt="Username"
                    placeholder=""
                    name="username"
                />
            </label>
            <label className="input">
                <span className="input__name">Origin</span>
                <input
                    className="input__value"
                    type="checkbox"
                    checked={origin}
                    onChange={() => setOrigin(origin => !origin)}
                    alt="Username"
                    placeholder=""
                    name="username"
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
                    alt="Password"
                    placeholder=""
                    name="password"
                />
            </label>
            <p>
                If you don't want to change the account password ensure the password
                field is left blank
            </p>

            <button className="button" onClick={() => saveMutation.mutate()}>Save</button>
        </div>
    )
}