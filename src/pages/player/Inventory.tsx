import { Navigate, Route, Routes } from "react-router-dom"
import Characters from "./inventory/Characters"
import Consumables from "./inventory/Consumables";
import Gear from "./inventory/Gear";
import WeaponMods from "./inventory/WeaponMods";
import Weapons from "./inventory/Weapons"
import { Player } from "@api/models";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getPlayerData, setPlayerData, updatePlayer } from "@api/routes";
import { AppContext, useAppContext } from "@contexts/AppContext";
import { NavLink } from "react-router-dom";
import { parsePlayerBase, PlayerBase, encodeInventory, parseInventory, encodePlayerBase } from "@api/parser";
import { useAsync } from "react-use";

interface Properties {
    player: Player;
}

export interface InventoryProperties {
    inventory: number[],
    setInventory(value: number[]): void;
}

export default function Inventory({ player }: Properties) {
    const context: AppContext = useAppContext();

    const [base, setBase] = useState<PlayerBase>(null!);

    const [inventory, setInventory] = useState<number[]>([]);
    const [failedParse, setFailedParse] = useState(false)

    // Mutation state for saving the inventory
    const saveMutation = useMutation(save);


    // Effect for updating the inventory when the player changes
    useAsync(async () => {
        setFailedParse(false);
        const data = await getPlayerData(context, player, "Base");

        if (data.value == null) {
            setFailedParse(true);
            return;
        }

        const base = parsePlayerBase(data.value);
        if (base == null) {
            setFailedParse(true);
            return;
        }
        setBase(base);
        setInventory(parseInventory(base.inventory));
    }, [player]);

    /**
     * Function for saving the current inventory state into
     * the actual player inventory updating it on the server.
     * 
     * The server returns the updated player structure which 
     * is updated using setPlayer
     */
    async function save(): Promise<void> {
        const newInventory = encodeInventory(inventory);

        const newBase: PlayerBase = {
            ...base,
            inventory: newInventory
        }

        setBase(newBase);

        await setPlayerData(context, player, "Base", encodePlayerBase(newBase));
    }

    /**
     * Resets the inventory state to the inventory
     * stored on the player
     */
    function reset(): void {
        setInventory(parseInventory(base.inventory));
    }

    if (failedParse) {
        return <div className="list__contents">
            <h1>Inventory contents were missing or unparsable. Possibly not initialized yet?</h1>
        </div>
    }

    return (
        <div className="list__contents">
            <nav className="list__contents__header">
                <button onClick={() => saveMutation.mutate()} className="button">Save</button>
                <button onClick={reset} className="button">Reset</button>
                <NavLink
                    className={({ isActive }) => isActive ? "button button--nav--active" : "button button--nav"}
                    to="characters">
                    Characters
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? "button button--nav--active" : "button button--nav"}
                    to="weapons">
                    Weapons
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? "button button--nav--active" : "button button--nav"}
                    to="weapon-mods">
                    Weapon Mods
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? "button button--nav--active" : "button button--nav"}
                    to="consumables">
                    Consumables
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? "button button--nav--active" : "button button--nav"}
                    to="gear">
                    Gear
                </NavLink>
            </nav>

            {saveMutation.isLoading && (
                <div>
                    Saving...
                </div>
            )}

            {saveMutation.isError && (
                <div>
                    Failed to save inventory.
                </div>
            )}

            <Routes >
                <Route path="/" element={<Navigate to="characters" />} />
                <Route path="/characters" element={<Characters inventory={inventory} setInventory={setInventory} />} />
                <Route path="/weapons" element={<Weapons inventory={inventory} setInventory={setInventory} />} />
                <Route path="/weapon-mods" element={<WeaponMods inventory={inventory} setInventory={setInventory} />} />
                <Route path="/consumables" element={<Consumables inventory={inventory} setInventory={setInventory} />} />
                <Route path="/gear" element={<Gear inventory={inventory} setInventory={setInventory} />} />
            </Routes>
        </div>
    )
}