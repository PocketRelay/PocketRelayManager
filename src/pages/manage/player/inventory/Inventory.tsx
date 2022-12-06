import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Characters from "./Characters"
import Consumables from "./Consumables";
import Gear from "./Gear";
import WeaponMods from "./WeaponMods";
import Weapons from "./Weapons"
import "./Inventory.scss"

interface Properties {
    inventory: number[],
    setInventory(value: number[]): void;
    saveInventory(): Promise<void>;
    resetInventory(): void;
}

export interface InventoryProperties {
    inventory: number[],
    setInventory(value: number[]): void;
}

export default function Inventory({ inventory, saveInventory, resetInventory, setInventory }: Properties) {
    return (
        <div className="inventory">
            <div className="inventory__actions">
                <button onClick={saveInventory} className="button">Save</button>
                <button onClick={resetInventory} className="button">Reset</button>
            </div>
            <nav className="inventory__nav">
                <Link className="inventory__nav__button button" to="characters">Characters</Link>
                <Link className="inventory__nav__button button" to="weapons">Weapons</Link>
                <Link className="inventory__nav__button button" to="weapon-mods">Weapon Mods</Link>
                <Link className="inventory__nav__button button" to="consumables">Consumables</Link>
                <Link className="inventory__nav__button button" to="gear">Gear</Link>
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