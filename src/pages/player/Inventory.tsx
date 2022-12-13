import { Navigate, Route, Routes } from "react-router-dom"
import Characters from "./inventory/Characters"
import Consumables from "./inventory/Consumables";
import Gear from "./inventory/Gear";
import WeaponMods from "./inventory/WeaponMods";
import Weapons from "./inventory/Weapons"
import { Player } from "@api/models";
import { useEffect, useState } from "react";
import { encodeInventory, parseInventory } from "@data/inventory";
import { useMutation } from "react-query";
import { updatePlayer } from "@api/routes";
import { AppContext, useAppContext } from "@contexts/AppContext";
import { NavLink } from "react-router-dom";

interface Properties {
    player: Player;
    setPlayer(player: Player): void;
}

export interface InventoryProperties {
    inventory: number[],
    setInventory(value: number[]): void;
}

export default function Inventory({ player, setPlayer }: Properties) {
    const context: AppContext = useAppContext();
    const [inventory, setInventory] = useState<number[]>([]);

    // Mutation state for saving the inventory
    const saveMutation = useMutation(save);

    // Effect for updating the inventory when the player changes
    useEffect(() => {
        setInventory(parseInventory(player.inventory));
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
        const newPlayer = await updatePlayer(context, player.id, {
            inventory: newInventory,
        });
        setPlayer(newPlayer);
    }

    /**
     * Resets the inventory state to the inventory
     * stored on the player
     */
    function reset(): void {
        setInventory(parseInventory(player.inventory));
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
                <Route path="/" element={<Navigate to="characters"/>}/>
                <Route path="/characters" element={<Characters inventory={inventory} setInventory={setInventory} />} />
                <Route path="/weapons" element={<Weapons inventory={inventory} setInventory={setInventory} />} />
                <Route path="/weapon-mods" element={<WeaponMods inventory={inventory} setInventory={setInventory} />} />
                <Route path="/consumables" element={<Consumables inventory={inventory} setInventory={setInventory} />} />
                <Route path="/gear" element={<Gear inventory={inventory} setInventory={setInventory} />} />
            </Routes>
        </div>
    )
}