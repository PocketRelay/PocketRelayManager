import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { Player } from "../../../../api/models"
import { parseInventory } from "../../../../inventory"
import Characters from "./Characters"

interface Properties {
    player: Player
}

export default function Inventory({ player }: Properties) {
    const inventory = useMemo(() => parseInventory(player.inventory), [player]);

    return (
        <div className="inventory">
            <h1>Inventory {player.id}</h1>
            <span>Raw Inventory</span>
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
            <textarea value={player.inventory}>

            </textarea>
        </div>
    )
}