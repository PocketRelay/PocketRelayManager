import LeveledCard from "../../../../components/inventory/LeveledCard";
import { GEAR_CONSUMABLES, GEAR_MAX } from "../../../../inventory";
import "./Gear.scss";

interface Properties {
    inventory: number[];
    setInventory(value: number[]): void;
}

export default function Gear({ inventory, setInventory }: Properties) {
    
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
        <div className="inventory__section">
            <div className="inventory__section__header">
                <button onClick={() => setLevelAll(1)}>
                    Unlock All
                </button>
                <button onClick={() => setLevelAll(GEAR_MAX)}>
                    Max Level All
                </button>
                <button onClick={() => setLevelAll(255)}>
                    God Level All
                </button>
            </div>
            <div className="inventory__section__value gears">
                {GEAR_CONSUMABLES.map((gear, index) => (
                    <LeveledCard
                        key={index}
                        inventory={inventory}
                        index={gear.index}
                        name={gear.name}
                        imageURL={`/assets/gear/${gear.image}`}
                        imageHeight={120}
                        max={GEAR_MAX}
                    />
                ))}
            </div>
        </div>
    )
}

