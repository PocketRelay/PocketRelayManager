import Collapse from "../../../../components/Collapse";
import { CoreConsumable, OtherConsumable, TieredConsumable } from "../../../../components/inventory/Consumable";
import { CONSUMABLES, CORE_CONSUMABLES, OTHER_CONSUMABLES } from "../../../../inventory";

interface Properties {
    inventory: number[];
}

export default function Consumables({ inventory }: Properties) {
    return (
        <div className="collapse-list">
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
    )
}