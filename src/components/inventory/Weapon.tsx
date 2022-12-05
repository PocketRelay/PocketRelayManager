import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { MAX_WEAPON_LEVEL, Weapon as WeaponModel } from "../../inventory";
import "./Weapon.scss"

interface Properties {
    inventory: number[];
    weapon: WeaponModel;
}

export default function Weapon({ inventory, weapon }: Properties) {
    const [level, setLevelImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setLevelImpl(inventory[weapon.level_index])
    }, [inventory, weapon])


    const isOwned = level > 0;
    // Path to the weapon image
    const imageURL: string = `/assets/weapons/${weapon.image}`;

    function setLevel(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[weapon.level_index] = level;
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
    const actionTitle: string = isOwned ? "Removes the weapon from the player inventory" : "Adds the weapon to the player inventory"

    return (
        <div className="weapon" data-rarity={weapon.rarity} data-owned={isOwned}>
            <h2 className="weapon__name">{weapon.name}</h2>
            <div className="weapon__img-wrapper">
                <img className="weapon__img" src={imageURL} alt={`${weapon.name} Image`} />
            </div>
            <WeaponLevel
                level={level}
                setLevel={setLevel}
                max={MAX_WEAPON_LEVEL}
                disabled={!isOwned}
            />
            <button
                className="weapon__action"
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

function WeaponLevel({ level, setLevel, max, disabled }: LevelProperties) {

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