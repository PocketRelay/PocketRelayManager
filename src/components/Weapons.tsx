import { WEAPON_CATEGORIES, Weapon } from "../inventory";
import { InventoryState } from "./Inventory";

import "./Weapons.css";


function WeaponElm({ weapon, inventory: [values, setValues] }: { weapon: Weapon, inventory: InventoryState }) {
    const image_url = "/assets/weapons/" + weapon.image;
    let level = values[weapon.level_index]
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
        <div className="weapon">
            <img src={image_url} className="weapon__image" />
            <div className="weapon__details">
                <h2 className="weapon__name">{weapon.name}</h2>
                {button}
            </div>
        </div>
    )
}

interface WeaponsProperties {
    inventory: InventoryState,
}


export default function Weapons({ inventory }: WeaponsProperties) {

    return (
        <div className="weapons">
            {WEAPON_CATEGORIES.map((category, index) => (
                <div className="weapon_category" key={index}>
                    <h1>{category.name}</h1>
                    <div className="weapons_value">
                        {category.values.map((value, index) => <WeaponElm key={index} weapon={value} inventory={inventory} />)}
                    </div>
                </div>
            ))}

        </div>
    )

}