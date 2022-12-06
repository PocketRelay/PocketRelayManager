import { ChangeEvent, useEffect, useState } from "react";
import {
    GearConsumable as GearConsumableModel,
    GEAR_MAX
} from "../../inventory";
import "./Gear.scss"


export function GearConsumable({ inventory, consumable }: { inventory: number[], consumable: GearConsumableModel }) {
    const [level, setLevelImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setLevelImpl(inventory[consumable.index])
    }, [inventory, consumable])

    const isOwned = level > 0;
    // Path to the weapon image
    const imageURL: string = `/assets/gear/${consumable.image}`;

    function setLevel(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[consumable.index] = level;
        setLevelImpl(level);
    }


    function toggleOwned() {
        if (isOwned) {
            setLevel(0);
        } else {
            setLevel(1);
        }
    }

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the consumable from the player inventory" : "Adds the consumable to the player inventory"

    return (
        <div className="consumable" title={consumable.text}>
            <h2 className="consumable__name">{consumable.name}</h2>
            <div className="consumable__img-wrapper">
                <img className="consumable__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <GearLevel
                level={level}
                setLevel={setLevel}
                max={GEAR_MAX}
                disabled={!isOwned}
            />
            <button
                className="consumable__action"
                title={actionTitle}
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )
}

interface LevelProperties {
    level: number;
    setLevel(value: number): void;
    max: number;
    disabled: boolean
}

function GearLevel({ level, setLevel, max, disabled }: LevelProperties) {

    function setLevelEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setLevel(valueInt);
    }

    return (
        <div className="level" data-disabled={disabled}>
            <label className="level__input input">
                <span className="level__input__name input__name">Level</span>
                <input
                    disabled={disabled}
                    className="input__value"
                    type="number"
                    value={level}
                    onChange={setLevelEvent} />
            </label>
            <div className="level__actions">
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(1)}
                    title="Set the level to the minimum level (1)"
                    disabled={disabled}
                >
                    Min
                </button>
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(max)}
                    title="Set the level to the max normal level"
                    disabled={disabled}
                >
                    Max
                </button>
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(255)}
                    title="Set the level to the max cheated level"
                    disabled={disabled}
                >
                    GOD
                </button>
            </div>
        </div>
    )
}