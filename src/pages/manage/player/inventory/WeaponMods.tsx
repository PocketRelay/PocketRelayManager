import Collapse from "../../../../components/Collapse";
import LeveledCard from "../../../../components/inventory/LeveledCard";
import { MAX_WEAPON_MOD_LEVEL, WEAPON_MODS } from "../../../../inventory";

interface Properties {
    inventory: number[];
}

export default function WeaponMods({ inventory }: Properties) {
    return (
        <div className="collapse-list">
            {WEAPON_MODS.map((category, index) => (
                <Collapse name={category.name} key={index}>
                    {category.values.map((weaponMod, index) => (
                        <LeveledCard
                            key={index}
                            inventory={inventory}
                            index={weaponMod.level_index}
                            name={weaponMod.name}
                            imageURL={`/assets/weapon_mods/${weaponMod.image}`}
                            imageHeight={110}
                            max={MAX_WEAPON_MOD_LEVEL}
                        />
                    ))}
                </Collapse>
            ))}
        </div>
    )
}
