import { useLeveled } from "../../hooks/inventory";
import { MAX_WEAPON_MOD_LEVEL, WeaponMod as WeaponModModel } from "../../inventory";
import LevelSelect from "../LevelSelect";
import "./WeaponMod.scss"

interface Properties {
    inventory: number[];
    weaponMod: WeaponModModel;
}

export default function WeaponMod({ inventory, weaponMod }: Properties) {
    const [level, setLevel, isOwned, toggleOwned] = useLeveled(inventory, weaponMod.level_index);

    // Path to the weapon image
    const imageURL: string = `/assets/weapon_mods/${weaponMod.image}`;

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the weapon mod from the player inventory" : "Adds the weapon mod to the player inventory"

    return (
        <div className="weapon-mod" data-owned={isOwned}>
            <h2 className="weapon-mod__name">{weaponMod.name}</h2>
            <div className="weapon-mod__img-wrapper">
                <img className="weapon-mod__img" src={imageURL} alt={`${weaponMod.name} Image`} />
            </div>
            <LevelSelect
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
