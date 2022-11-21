import { WEAPON_CATEGORIES, Weapon, Consumable, CONSUMABLES } from "../inventory";
import { InventoryState } from "./Inventory";

import "./Consumables.css";


function ConsumableElm({ consumable, inventory: [values, setValues] }: { consumable: Consumable, inventory: InventoryState }) {
    const image_url = "/assets/consumables/" + consumable.image;

    let content = [];
    let tier_names = ["I", "II", "III", "IV", "V"]
    for (let i = 0; i < consumable.indexes.length; i++) {
        let index = consumable.indexes[i];
        let amount = values[index];
        let owned = amount > 0;
        let tier = tier_names[i];
        if (owned) {
            content.push((
                <div>
                    <span>{tier}</span>
                    <input type="number" value={amount}></input>
                    <button>Remove</button>
                </div>
            ));
        } else {
            content.push((
                <div>
                    <span>{tier}</span>
                    <button>Add</button>
                </div>
            ));
        }
    }

    return (
        <div className="consumable">
            <img src={image_url} className="consumable__image" />
            <div className="consumable__details">
                <h2 className="consumable__name">{consumable.name}</h2>
                {content}
            </div>
        </div>
    )
}

interface ConsumablesProperties {
    inventory: InventoryState,
}


export default function Consumables({ inventory }: ConsumablesProperties) {

    return (
        <div className="consumables">
            {CONSUMABLES.map((category, index) => (
                <div className="consumable_category" key={index}>
                    <h1>{category.name}</h1>
                    <div className="consumables_value">
                        {category.values.map((value, index) => <ConsumableElm key={index} consumable={value} inventory={inventory} />)}
                    </div>
                </div>
            ))}

        </div>
    )

}