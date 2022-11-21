import { WEAPON_CATEGORIES, Weapon, WEAPON_MODS, WeaponMod } from "../inventory";
import { InventoryState } from "./Inventory";

import "./WeaponMods.css";


function WeaponModElm({ mod, inventory: [values, setValues] }: { mod: WeaponMod, inventory: InventoryState }) {
    const image_url = "/assets/weapon_mods/" + mod.image;
    let level = values[mod.level_index];
    let owned = level > 0;
    let button;
    if (owned) {
        button = (
            <div>
                <input type="number" value={level}></input>
                <button>Remove</button>
            </div>
        )
    } else {
        button = (
            <div>
                <button>Add</button>
            </div>
        )
    }

    return (
        <div className="weapon_mod">
            <img src={image_url} className="weapon_mod__image" />
            <div className="weapon_mod__details">
                <h2 className="weapon_mod__name">{mod.name}</h2>
                {button}
            </div>
        </div>
    )
}

interface WeaponModsProperties {
    inventory: InventoryState,
}


export default function WeaponMods({ inventory }: WeaponModsProperties) {

    return (
        <div className="weapon_mods">
            {WEAPON_MODS.map((category, index) => (
                <div className="weapon_mods_category" key={index}>
                    <h1>{category.name}</h1>
                    <div className="weapon_mods_value">
                        {category.values.map((value, index) => <WeaponModElm key={index} mod={value} inventory={inventory} />)}
                    </div>
                </div>
            ))}

        </div>
    )

}