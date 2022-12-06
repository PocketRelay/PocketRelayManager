import Collapse from "../../../../components/Collapse";
import Weapon from "../../../../components/inventory/Weapon";
import { WEAPON_CATEGORIES } from "../../../../inventory";

interface Properties {
    inventory: number[];
}

export default function Weapons({ inventory }: Properties) {
    return (
        <div className="collapse-list">
            {WEAPON_CATEGORIES.map((category, index) => (
                <Collapse name={category.name} key={index}>
                    {category.values.map((weapon, index) => (
                        <Weapon inventory={inventory} weapon={weapon} key={index} />
                    ))}
                </Collapse>
            ))}
        </div>
    )
}
