import { Link, useLocation } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Characters from "./inventory/Characters"
import Consumables from "./inventory/Consumables";
import Gear from "./inventory/Gear";
import WeaponMods from "./inventory/WeaponMods";
import Weapons from "./inventory/Weapons"
import "./Inventory.scss"
import { Player } from "../../../api/models";
import { useEffect, useState } from "react";
import { encodeInventory, parseInventory } from "../../../inventory";
import { useMutation } from "react-query";
import { updatePlayer } from "../../../api/routes";
import { AppContext, useAppContext } from "../../../contexts/AppContext";

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
        console.log("Player CHanged");
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

    let location = useLocation();
    return (
        <div className="inventory">
            <nav className="inventory__actions">
                <button onClick={() => saveMutation.mutate()} className="button">Save</button>
                <button onClick={reset} className="button">Reset</button>
                <Link
                    className="inventory__actions__button button"
                    data-active={location.pathname.endsWith("characters")}
                    to="characters">
                    Characters
                </Link>
                <Link
                    className="inventory__actions__button button"
                    data-active={location.pathname.endsWith("weapons")}
                    to="weapons">
                    Weapons
                </Link>
                <Link
                    className="inventory__actions__button button"
                    data-active={location.pathname.endsWith("weapon-mods")}
                    to="weapon-mods">
                    Weapon Mods
                </Link>
                <Link
                    className="inventory__actions__button button"
                    data-active={location.pathname.endsWith("consumables")}
                    to="consumables">
                    Consumables
                </Link>
                <Link
                    className="inventory__actions__button button"
                    data-active={location.pathname.endsWith("gear")}
                    to="gear">
                    Gear
                </Link>
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
                <Route path="/characters" element={<Characters inventory={inventory} setInventory={setInventory} />} />
                <Route path="/weapons" element={<Weapons inventory={inventory} setInventory={setInventory} />} />
                <Route path="/weapon-mods" element={<WeaponMods inventory={inventory} setInventory={setInventory} />} />
                <Route path="/consumables" element={<Consumables inventory={inventory} setInventory={setInventory} />} />
                <Route path="/gear" element={<Gear inventory={inventory} setInventory={setInventory} />} />
            </Routes>
        </div>
    )
}