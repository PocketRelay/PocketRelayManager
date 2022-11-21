import { WEAPON_CATEGORIES, Weapon, Consumable, CONSUMABLES, CoreConsumable, CORE_CONSUMABLES, OtherConsumable, OTHER_CONSUMABLES } from "../inventory";
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
function CoreConsumableElm({ consumable, inventory: [values, setValues] }: { consumable: CoreConsumable, inventory: InventoryState }) {
    const image_url = "/assets/consumables/" + consumable.stock_image;

    let capacity = values[consumable.capacity_index];
    let stock = values[consumable.stock_index];


    return (
        <div className="consumable">
            <img src={image_url} className="consumable__image" />
            <div className="consumable__details">
                <h2 className="consumable__name">{consumable.name}</h2>
                <input type="number" value={stock} />
                <input type="number" value={capacity} />
            </div>
        </div>
    )
}
function OtherConsumableElm({ consumable, inventory: [values, setValues] }: { consumable: OtherConsumable, inventory: InventoryState }) {
    const image_url = "/assets/consumables/" + consumable.image;
    let amount = values[consumable.index];

    return (
        <div className="consumable">
            <img src={image_url} className="consumable__image" />
            <div className="consumable__details">
                <h2 className="consumable__name">{consumable.name}</h2>
                <input type="number" value={amount} />
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
            <div className="consumable_category">
                <h1>Basic</h1>
                <div className="consumables_value">
                    {CORE_CONSUMABLES.map((value, index) => <CoreConsumableElm key={index} consumable={value} inventory={inventory} />)}
                    {OTHER_CONSUMABLES.map((value, index) => <OtherConsumableElm key={index} consumable={value} inventory={inventory}  />)}
                </div>
            </div>
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