import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Characters from "./Characters"
import Consumables from "./Consumables";
import Gear from "./Gear";
import WeaponMods from "./WeaponMods";
import Weapons from "./Weapons"

interface Properties {
    inventory: number[],
    setInventory(value: number[]): void;
    saveInventory(): Promise<void>;
    resetInventory(): void;
}


export default function Inventory({ inventory, saveInventory, resetInventory, setInventory }: Properties) {
    return (
        <div className="inventory">
            <h1>Inventory</h1>
            <button onClick={saveInventory} className="button">Save</button>
            <button onClick={resetInventory} className="button">Reset</button>
            <nav>
                <Link to="characters">Characters</Link>
                <Link to="weapons">Weapons</Link>
                <Link to="weapon-mods">Weapon Mods</Link>
                <Link to="consumables">Consumables</Link>
                <Link to="gear">Gear</Link>
            </nav>
            <Routes >
                <Route path="characters" element={<Characters inventory={inventory} setInventory={setInventory} />} />
                <Route path="weapons" element={<Weapons inventory={inventory} setInventory={setInventory} />} />
                <Route path="weapon-mods" element={<WeaponMods inventory={inventory} setInventory={setInventory} />} />
                <Route path="consumables" element={<Consumables inventory={inventory} setInventory={setInventory} />} />
                <Route path="gear" element={<Gear inventory={inventory} setInventory={setInventory} />} />
            </Routes>
        </div>
    )
}