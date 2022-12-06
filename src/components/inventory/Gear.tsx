import { useLeveled } from "../../hooks/inventory";
import {
    GearConsumable as GearConsumableModel,
    GEAR_MAX
} from "../../inventory";
import LevelSelect from "../LevelSelect";
import "./Gear.scss"


export function GearConsumable({ inventory, consumable }: { inventory: number[], consumable: GearConsumableModel }) {
    const [level, setLevel, isOwned, toggleOwned] = useLeveled(inventory, consumable.index);

    // Path to the weapon image
    const imageURL: string = `/assets/gear/${consumable.image}`;

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the consumable from the player inventory" : "Adds the consumable to the player inventory"

    return (
        <div className="consumable" title={consumable.text}>
            <h2 className="consumable__name">{consumable.name}</h2>
            <div className="consumable__img-wrapper">
                <img className="consumable__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <LevelSelect
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