import { GearConsumable } from "../../../../components/inventory/Gear";
import { GEAR_CONSUMABLES } from "../../../../inventory";
import "./Gear.scss";

interface Properties {
    inventory: number[];
}

export default function Gear({ inventory }: Properties) {
    return (
        <div className="gears">
            {GEAR_CONSUMABLES.map((consumable, index) => (
                <GearConsumable inventory={inventory} consumable={consumable} key={index} />
            ))}
        </div>
    )
}

