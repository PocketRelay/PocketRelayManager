import Collapse from "../../../../components/Collapse";
import LeveledCard from "../../../../components/inventory/LeveledCard";
import { MAX_WEAPON_LEVEL, WEAPON_CATEGORIES } from "../../../../inventory";

interface Properties {
    inventory: number[];
}

export default function Weapons({ inventory }: Properties) {
    return (
        <div className="collapse-list">
            {WEAPON_CATEGORIES.map((category, index) => (
                <Collapse name={category.name} key={index}>
                    {category.values.map((weapon, index) => (
                        <LeveledCard
                            key={index}
                            inventory={inventory}
                            index={weapon.level_index}
                            name={weapon.name}
                            imageURL={`/assets/weapons/${weapon.image}`}
                            imageHeight={85}
                            max={MAX_WEAPON_LEVEL}
                            rarity={weapon.rarity}
                        />
                    ))}
                </Collapse>
            ))}
        </div>
    )
}
