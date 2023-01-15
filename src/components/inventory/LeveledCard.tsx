import { ChangeEvent, useEffect, useState } from "react";
import { Rarity } from "@data/inventory";

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

    /**
     * Function for toggling between the owned and not owned states
     */
    function toggleOwned() {
        if (level > 0) {
            setLevel(0);
        } else {
            setLevel(1);
        }
    }

    /**
     * Event handler for updating the level value
     * when the level input value is changed
     * 
     * @param event The change event
     */
    function setLevelEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setLevel(valueInt);
    }

    // If the level is greater than zero then the item is owned
    const isOwned: boolean = level > 0;
    // Level chaning is disabled if the item is not owned
    const isLevelDisabled: boolean = !isOwned;

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the item from the player inventory" : "Adds the item to the player inventory"

    return (
        <div className="card" data-owned={isOwned} data-rarity={rarity}>
            <h2 className="card__name">{name}</h2>
            <div className="card__img-wrapper" style={{ height: imageHeight }}>
                <img className="card__img" src={imageURL} alt={`${name} Image`} />
            </div>
            <div className="card__level" data-disabled={isLevelDisabled}>
                <input
                    disabled={isLevelDisabled}
                    className="card__level__input"
                    type="number"
                    value={level}
                    onChange={setLevelEvent} />
                <div className="card__level__actions">
                    <button
                        className="card__level__actions__button"
                        onClick={() => setLevel(1)}
                        title="Set the level to the minimum level (1)"
                        disabled={isLevelDisabled}>
                        Min
                    </button>
                    <button
                        className="card__level__actions__button"
                        onClick={() => setLevel(max)}
                        title="Set the level to the max normal level"
                        disabled={isLevelDisabled}>
                        Max
                    </button>
                    <button
                        className="card__level__actions__button"
                        onClick={() => setLevel(255)}
                        title="Set the level to the max cheated level"
                        disabled={isLevelDisabled}>
                        GOD
                    </button>
                </div>
            </div>
            <button
                className="card__action"
                title={actionTitle}
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )

}