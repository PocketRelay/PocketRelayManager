import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Characters from "./Characters"
import WeaponMods from "./WeaponMods";
import Weapons from "./Weapons"

interface Properties {
    inventory: number[],
    saveInventory(): Promise<void>;
}

export default function Inventory({ inventory, saveInventory }: Properties) {
    console.log("Render inventory");
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
                <Route path="characters" element={<Characters inventory={inventory} />} />
                <Route path="weapons" element={<Weapons inventory={inventory} />} />
                <Route path="weapon-mods" element={<WeaponMods inventory={inventory} />} />
                <Route path="consumables" />
                <Route path="gear" />
            </Routes>
        </div>
    )
}