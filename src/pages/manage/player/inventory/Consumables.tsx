import Collapse from "../../../../components/Collapse";
import { CoreConsumable, OtherConsumable, TieredConsumable } from "../../../../components/inventory/Consumable";
import { CONSUMABLES, CORE_CONSUMABLES, OTHER_CONSUMABLES } from "../../../../inventory";
import { InventoryProperties } from "./Inventory";

export default function Consumables({ inventory, setInventory }: InventoryProperties) {
    
    /**
     * Function for setting the level of all the weapons
     */
    function setMaxAll() {
        const indexes: number[] = [];
        CORE_CONSUMABLES.forEach(value => indexes.push(value.capacity_index, value.stock_index));
        OTHER_CONSUMABLES.forEach(value => indexes.push(value.index));
        CONSUMABLES.forEach(value => value.values.forEach(value => indexes.push(...value.indexes)));
        setInventory(inventory.map((value, index) => {
            return indexes.includes(index) ? 255 : value
        }));
    }

    return (
        <div className="inventory__section">
            <div className="inventory__section__header">
                <button className="button" onClick={setMaxAll}>
                    Max All
                </button>
            </div>
            <div className="inventory__section__value collapse-list">
                <Collapse name="Basic">
                    {CORE_CONSUMABLES.map((consumable, index) => (
                        <CoreConsumable inventory={inventory} consumable={consumable} key={index} />
                    ))}
                    {OTHER_CONSUMABLES.map((consumable, index) => (
                        <OtherConsumable inventory={inventory} consumable={consumable} key={index} />
                    ))}
                </Collapse>

                {CONSUMABLES.map((category, index) => (
                    <Collapse name={category.name} key={index}>
                        {category.values.map((consumable, index) => (
                            <TieredConsumable inventory={inventory} consumable={consumable} key={index} />
                        ))}
                    </Collapse>
                ))}
            </div>
        </div>
    )
}