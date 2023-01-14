import LeveledCard from "@components/inventory/LeveledCard";
import { GEAR_CONSUMABLES, LOCKED, MAX_GEAR_LEVEL, UNLOCKED, UNSAFE_MAX } from "@data/inventory";
import { InventoryProperties } from "../Inventory";

export default function Gear({ inventory, setInventory }: InventoryProperties) {

    /**
      * Function for setting the level of all the gear
      */
    function setLevelAll(level: number) {
        const indexes: number[] = [];
        GEAR_CONSUMABLES.forEach(value => indexes.push(value.index));
        setInventory(inventory.map((value, index) => {
            return indexes.includes(index) ? level : value
        }));
    }

    return (
        <div className="list__contents">
            <h1 className="list__contents__title">Gear</h1>
            <div className="list__contents__header">
                <button className="button" onClick={() => setLevelAll(LOCKED)}>
                    Lock All
                </button>
                <button className="button" onClick={() => setLevelAll(UNLOCKED)}>
                    Unlock All
                </button>
                <button className="button" onClick={() => setLevelAll(MAX_GEAR_LEVEL)}>
                    Max Level All
                </button>
                <button className="button" onClick={() => setLevelAll(UNSAFE_MAX)}>
                    God Level All
                </button>
            </div>
            <div className="list__contents__value list__contents--rows">
                {GEAR_CONSUMABLES.map((gear, index) => (
                    <LeveledCard
                        key={index}
                        inventory={inventory}
                        index={gear.index}
                        name={gear.name}
                        imageURL={`/assets/gear/${gear.image}`}
                        imageHeight={120}
                        max={MAX_GEAR_LEVEL}
                    />
                ))}
            </div>
        </div>
    )
}

