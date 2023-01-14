import Collapse from "@components/Collapse";
import LeveledCard from "@components/inventory/LeveledCard";
import { LOCKED, MAX_WEAPON_MOD_LEVEL, UNLOCKED, UNSAFE_MAX, WEAPON_MODS } from "@data/inventory";
import { InventoryProperties } from "../Inventory";

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
        <div className="list__contents">
            <h1 className="list__contents__title">Weapon Mods</h1>
            <div className="list__contents__header">
                <button className="button" onClick={() => setLevelAll(LOCKED)}>
                    Lock All
                </button>
                <button className="button" onClick={() => setLevelAll(UNLOCKED)}>
                    Unlock All
                </button>
                <button className="button" onClick={() => setLevelAll(MAX_WEAPON_MOD_LEVEL)}>
                    Max Level All
                </button>
                <button className="button" onClick={() => setLevelAll(UNSAFE_MAX)}>
                    God Level All
                </button>
            </div>
            <div className="list__contents__value collapse-list">
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
