import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { MAX_WEAPON_MOD_LEVEL, WeaponMod as WeaponModModel } from "../../inventory";
import "./WeaponMod.scss"

interface Properties {
    inventory: number[];
    weapon: WeaponModModel;
}

export default function WeaponMod({ inventory, weapon: weaponMod }: Properties) {
    const [level, setLevelImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setLevelImpl(inventory[weaponMod.level_index])
    }, [inventory, weaponMod])


    const isOwned = level > 0;
    // Path to the weapon image
    const imageURL: string = `/assets/weapon_mods/${weaponMod.image}`;

    function setLevel(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[weaponMod.level_index] = level;
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
    const actionTitle: string = isOwned ? "Removes the weapon mod from the player inventory" : "Adds the weapon mod to the player inventory"

    return (
        <div className="weapon-mod" data-owned={isOwned}>
            <h2 className="weapon-mod__name">{weaponMod.name}</h2>
            <div className="weapon-mod__img-wrapper">
                <img className="weapon-mod__img" src={imageURL} alt={`${weaponMod.name} Image`} />
            </div>
            <WeaponModLevel
                level={level}
                setLevel={setLevel}
                max={MAX_WEAPON_MOD_LEVEL}
                disabled={!isOwned}
            />
            <button
                className="weapon-mod__action"
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

function WeaponModLevel({ level, setLevel, max, disabled }: LevelProperties) {

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