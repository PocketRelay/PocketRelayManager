import { useEffect, useState } from "react";
import { MAX_WEAPON_LEVEL, Weapon as WeaponModel } from "../../inventory";
import LevelSelect from "../LevelSelect";
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
            <LevelSelect
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
