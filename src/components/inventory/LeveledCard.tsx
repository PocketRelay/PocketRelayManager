import { useEffect, useState } from "react";
import { Rarity } from "../../inventory";
import LevelSelect from "../LevelSelect";
import "./LeveledCard.scss"

interface Properties {
    inventory: number[];
    index: number;
    name: string;
    imageURL: string;
    max: number;
    imageHeight: number;
    rarity?: Rarity;
}

export default function LeveledCard({ inventory, index, name, imageURL, max, rarity, imageHeight }: Properties) {
    const [level, setLevelImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setLevelImpl(inventory[index])
    }, [inventory, index])

    /**
     * Wrapping function for updating the level state as
     * well as the level in the actual inventory array
     * 
     * @param level The level value
     */
    function setLevel(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[index] = level;
        setLevelImpl(level);
    }


    const isOwned: boolean = level > 0;

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the item from the player inventory" : "Adds the item to the player inventory"


    /**
     * Function for toggling between the owned and not owned states
     */
    function toggleOwned() {

        if (isOwned) {
            setLevel(0);
        } else {
            setLevel(1);
        }
    }

    return (
        <div className="card" data-owned={isOwned} data-rarity={rarity}>
            <h2 className="card__name">{name}</h2>
            <div className="card__img-wrapper" style={{
                height: imageHeight
            }}>
                <img className="card__img" src={imageURL} alt={`${name} Image`} />
            </div>
            <LevelSelect
                level={level}
                setLevel={setLevel}
                max={max}
                disabled={!isOwned}
            />
            <button
                className="card__action"
                title={actionTitle}
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )

}