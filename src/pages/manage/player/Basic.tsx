import { Player } from "@api/models";
import { useEffect, useState } from "react";

import "./Basic.scss";

interface Properties {
    player: Player;
}

export default function Basic({ player }: Properties) {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [credits, setCredits] = useState(0);
    const [origin, setOrigin] = useState(false);

    useEffect(() => {
        setDisplayName(player.display_name);
        setEmail(player.email);
        setCredits(player.credits);
        setOrigin(player.origin);
    }, [player]);


    return (
        <div className="basic">
            <h1>Basic</h1>
            <label className="input">
                <span className="input__name">Display Name</span>
                <input
                    className="input__value"
                    type="text"
                    value={displayName}
                    onChange={() => { }}
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
                    onChange={() => { }}
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
                    onClick={() => { setOrigin(origin => !origin) }}
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

            <div>
                <label className="input">
                    <span className="input__name">Password</span>
                    <input
                        className="input__value"
                        type="password"
                        value={""}
                        onChange={() => { }}
                        alt="Password"
                        placeholder=""
                        name="password"
                    />
                </label>
                <button className="button">Update Password</button>
            </div>

            <button className="button">Save</button>
        </div>
    )
}