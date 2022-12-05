import { ChangeEvent, ReactNode, useState } from "react";
import { MAX_WEAPON_LEVEL, Weapon as WeaponModel } from "../../inventory";
import "./Weapon.scss"

interface Properties {
    inventory: number[];
    weapon: WeaponModel;
}

export default function Weapon({ inventory, weapon }: Properties) {
    const [level, setLevelImpl] = useState(inventory[weapon.level_index]);

    const isOwned = level > 0;

    // Path to the weapon image
    const imageURL: string = `/assets/weapons/${weapon.image}`;

    const actionText: string = isOwned ? "Remove" : "Add";


    function setLevel(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[weapon.level_index] = level;
        setLevelImpl(level);
    }

    let contents: ReactNode;

    if (isOwned) {
        contents = (
            <>
                <WeaponLevel
                    level={level}
                    setLevel={setLevel}
                    max={MAX_WEAPON_LEVEL} />
                <button
                    className="weapon__action"
                    title="Removes the weapon form the player inventory"
                    onClick={() => setLevel(0)}>
                    Remove
                </button>
            </>
        )
    } else {
        contents = (
            <button
                className="weapon__action"
                title="Adds the weapon to the player inventory"
                onClick={() => setLevel(1)}
            >
                Add
            </button>
        )
    }

    return (
        <div className="weapon">
            <h2 className="weapon__name">{weapon.name}</h2>
            <div className="weapon__img-wrapper">
                <img className="weapon__img" src={imageURL} alt={`${weapon.name} Image`} />
            </div>
            {contents}
        </div>
    )
}

interface LevelProperties {
    level: number;
    setLevel(value: number): void;
    max: number;
}

function WeaponLevel({ level, setLevel, max }: LevelProperties) {

    function setLevelEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setLevel(valueInt);
    }

    return (
        <div className="level">
            <label className="level__input input">
                <span className="input__name">Level</span>
                <input className="input__value" type="number" value={level} onChange={setLevelEvent} />
            </label>
            <div className="level__actions">
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(1)}
                    title="Set the level to the minimum level (1)"
                >
                    Min
                </button>
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(max)}
                    title="Set the level to the max normal level"
                >
                    Max
                </button>
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(255)}
                    title="Set the level to the max cheated level"
                >
                    GOD
                </button>
            </div>
        </div>
    )
}