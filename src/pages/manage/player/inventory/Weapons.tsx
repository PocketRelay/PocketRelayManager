import Collapse from "../../../../components/Collapse";
import LeveledCard from "../../../../components/inventory/LeveledCard";
import { MAX_WEAPON_LEVEL, WEAPON_CATEGORIES } from "../../../../inventory";

interface Properties {
    inventory: number[];
    setInventory(value: number[]): void;
}

export default function Weapons({ inventory, setInventory }: Properties) {


    /**
     * Function for setting the level of all the weapons
     */
    function setLevelAll(level: number) {
        const indexes: number[] = [];
        WEAPON_CATEGORIES.forEach(value => value.values.forEach(value => indexes.push(value.level_index)));
        setInventory(inventory.map((value, index) => {
            return indexes.includes(index) ? level : value
        }));
    }


    return (
        <div className="inventory__section">
            <div className="inventory__section__header">
                <button onClick={() => setLevelAll(1)}>
                    Unlock All
                </button>
                <button onClick={() => setLevelAll(MAX_WEAPON_LEVEL)}>
                    Max Level All
                </button>
                <button onClick={() => setLevelAll(255)}>
                    God Level All
                </button>
            </div>
            <div className="inventory__section__value collapse-list">
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
        </div>
    )
}
