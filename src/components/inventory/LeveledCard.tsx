import { useEffect, useState } from "react";
import { LOCKED, Rarity, UNLOCKED, UNSAFE_MAX } from "@data/inventory";
import { handleNumberInput } from "@hooks/number";

interface Properties {
    // The inventory contents array
    inventory: number[];
    // Index of the card level field in the inventory
    index: number;
    // Name of the card
    name: string;
    // URL to the card image 
    imageURL: string;
    // The maximum value to assign when the max value is pressed
    max: number;
    // The height of the image wrapper 
    imageHeight: number;
    // Optional rarity for the card coloring
    rarity?: Rarity;
}

/**
 * Reusable card component for items in the inventory where the
 * index represents a level value
 * 
 * @param props The properties for this card
 */
export default function LeveledCard(props: Properties) {
    const [level, setLevel] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => setLevel(props.inventory[props.index]), [props]);

    // Effect for keeping the inventory up to date with the state
    useEffect(() => { props.inventory[props.index] = level }, [level])

    // Function for toggled the unlocked / locked level states
    const toggleLocked = () => setLevel(level !== LOCKED ? LOCKED : UNLOCKED);

    // Handle for the level changes
    const levelHandle = handleNumberInput(
        LOCKED,
        UNSAFE_MAX,
        setLevel
    );

    // If the level is greater than zero then the item is owned
    const isOwned: boolean = level > 0;
    // Text for the action button
    const actionText: string = isOwned ? "Remove" : "Add";
    // Description title for the action
    const actionTitle: string = isOwned ? "Removes the item from the player inventory" : "Adds the item to the player inventory"

    return (
        <div className="card" data-owned={isOwned} data-rarity={props.rarity}>
            <h2 className="card__name">{props.name}</h2>
            <div className="card__img-wrapper" style={{ height: props.imageHeight }}>
                <img className="card__img" src={props.imageURL} alt={`${props.name} Image`} />
            </div>
            <div className="card__level">
                <input
                    className="card__level__input"
                    type="number"
                    value={level}
                    onChange={levelHandle} />
                <div className="card__level__actions">
                    <button
                        className="card__level__actions__button"
                        onClick={() => setLevel(UNLOCKED)}
                        title="Set the level to the minimum level (1)">
                        Min
                    </button>
                    <button
                        className="card__level__actions__button"
                        onClick={() => setLevel(props.max)}
                        title={`Set the level to the max normal level (${props.max})`}>
                        Max
                    </button>
                    <button
                        className="card__level__actions__button"
                        onClick={() => setLevel(UNSAFE_MAX)}
                        title="Set the level to the max cheated level (255)">
                        GOD
                    </button>
                </div>
            </div>
            <button
                className="card__action"
                title={actionTitle}
                onClick={toggleLocked}>
                {actionText}
            </button>
        </div>
    )

}