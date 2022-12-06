import Collapse from "../../../../components/Collapse";
import LeveledCard from "../../../../components/inventory/LeveledCard";
import { MAX_WEAPON_MOD_LEVEL, WEAPON_MODS } from "../../../../inventory";
import { InventoryProperties } from "./Inventory";

export default function WeaponMods({ inventory, setInventory }: InventoryProperties) {

    /**
     * Function for setting the level of all the weapon mods
     */
    function setLevelAll(level: number) {
        const indexes: number[] = [];
        WEAPON_MODS.forEach(value => value.values.forEach(value => indexes.push(value.level_index)));
        setInventory(inventory.map((value, index) => {
            return indexes.includes(index) ? level : value
        }));
    }

    return (
        <div className="inventory__section">
            <h1 className="inventory__section__title">Weapon Mods</h1>
            <div className="inventory__section__header">
                <button className="button" onClick={() => setLevelAll(1)}>
                    Unlock All
                </button>
                <button className="button" onClick={() => setLevelAll(MAX_WEAPON_MOD_LEVEL)}>
                    Max Level All
                </button>
                <button className="button" onClick={() => setLevelAll(255)}>
                    God Level All
                </button>
            </div>
            <div className="inventory__section__value collapse-list">
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
        </div>
    )
}
