import { useState } from "react";
import { Player } from "../../../api/models";

interface Properties {
    player: Player
}

export default function OriginSwitch({ player }: Properties) {
    const [origin, setOriginImpl] = useState(player.origin);
    const [password, setPassword] = useState("");

    async function setOrigin(origin: boolean): Promise<void> {
        // TODO: Update origin on the server
    }

    if (origin) {
        return (
            <div className="origin">
                <p>Enabling origin makes this account accessible to any origin accounts with the same matching email</p>
                <button>Enable Origin</button>
            </div>
        )
    } else {
        return (
            <div className="origin">
                <div className="origin-modal">
                    <h1>Disable Origin</h1>
                    <p>If you would like to make this a non-origin account you must provide a password for it to use</p>
                    <label className="input">
                        <span className="input__name">Password</span>
                        <input
                            className="input__value"
                            type="number"
                            alt="Credits"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder=""
                            name="credits"
                        />
                    </label>
                </div>
                <button>Disable Origin</button>
            </div>
        )
    }
}