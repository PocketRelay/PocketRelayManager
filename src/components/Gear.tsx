import { WEAPON_CATEGORIES, Weapon, GearConsumable, GEAR_CONSUMABLES } from "../inventory";
import { InventoryState } from "./Inventory";

import "./Gear.css";


function GearElm({ gear, inventory: [values, setValues] }: { gear: GearConsumable, inventory: InventoryState }) {
    const image_url = "/assets/gear/" + gear.image;
    let level = values[gear.index]
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
        <div className="gear">
            <img src={image_url} className="gear__image" />
            <div className="gear__details">
                <h2 className="gear__name">{gear.name}</h2>
                {button}
            </div>
        </div>
    )
}

interface GearsProperties {
    inventory: InventoryState,
}


export default function Gears({ inventory }: GearsProperties) {

    return (
        <div className="gears">

            {GEAR_CONSUMABLES.map((value, index) => <GearElm key={index} gear={value} inventory={inventory} />)}


        </div>
    )

}