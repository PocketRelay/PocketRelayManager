import Collapse from "../../../../components/Collapse";
import WeaponMod from "../../../../components/inventory/WeaponMod";
import { WEAPON_MODS } from "../../../../inventory";


interface Properties {
    inventory: number[];
}

export default function WeaponMods({ inventory }: Properties) {
    return (
        <div className="collapse-list">
            {WEAPON_MODS.map((category, index) => (
                <Collapse name={category.name} key={index}>
                    {category.values.map((weapon, index) => (
                        <WeaponMod inventory={inventory} weapon={weapon} key={index} />
                    ))}
                </Collapse>
            ))}
        </div>
    )
}
