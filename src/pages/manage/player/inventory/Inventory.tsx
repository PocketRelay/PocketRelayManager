import { Route, Routes } from "react-router-dom"
import { Player } from "../../../../api/models"

interface Properties {
    player: Player
}

export default function Inventory({player}: Properties) {
    return (
        <div>
            <h1>Inventory {player.id}</h1>
            <span>Raw Inventory</span>
            <Routes>
                <Route path="characters"></Route>
                <Route path="weapons"></Route>
                <Route path="weapons-mods"></Route>
                <Route path="consumables"></Route>
                <Route path="gear"></Route>
            </Routes>
            <textarea value={player.inventory}>

            </textarea>
        </div>
    )
}