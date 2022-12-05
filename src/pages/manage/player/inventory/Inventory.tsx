import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { Player } from "../../../../api/models"
import { updatePlayer } from "../../../../api/routes"
import { useAppContext } from "../../../../contexts/AppContext"
import { encodeInventory, parseInventory } from "../../../../inventory"
import Characters from "./Characters"

interface Properties {
    player: Player,
}

export default function Inventory({ player }: Properties) {
    const context = useAppContext();
    const inventory = useMemo(() => parseInventory(player.inventory), [player]);

    async function saveInventory(): Promise<void> {
        try {
            let value = encodeInventory(inventory);
            console.log(value);
            let _ = await updatePlayer(context, player.id, {
                inventory: value
            });
            player.inventory = value;
        } catch (e) {
            alert("Failed to save inventory");
        }
    }

    return (
        <div className="inventory">
            <h1>Inventory</h1>
            <button onClick={saveInventory} className="button">Save</button>
            <nav>
                <Link to="characters">Characters</Link>
                <Link to="weapons">Weapons</Link>
                <Link to="weapon-mods">Weapon Mods</Link>
                <Link to="consumables">Consumables</Link>
                <Link to="gear">Gear</Link>
            </nav>
            <Routes >
                <Route path="characters" element={<Characters inventory={inventory} />}></Route>
                <Route path="weapons"></Route>
                <Route path="weapon-mods"></Route>
                <Route path="consumables"></Route>
                <Route path="gear"></Route>
            </Routes>
        </div>
    )
}