import { ReactNode, useState } from "react";
import { Character as CharacterModel } from "../../inventory";
import "./Character.scss"

interface Properties {
    inventory: number[],
    character: CharacterModel
}

export default function Character({ inventory, character }: Properties) {
    // State determining whether the character is owned
    const [isOwned, setOwnedImpl] = useState<boolean>(inventory[character.index] > 0);
    // Path to the character image
    const imageURL: string = `/assets/characters_full/${character.image}`;

    /**
     * Wrapper for changing the owned state to ensure
     * the changes are persisted to the underlying
     * 
     * @param owned Whether the character is owned
     */
    function toggleOwned() {
        setOwnedImpl(owned => {
            let value = !owned;
            inventory[character.index] = value ? 1 : 0;
            return value;
        })
    }

    // Text to be displayed on the toggle button
    let actionText: string = isOwned ? "Remove" : "Add";

    return (
        <div className="character" data-owned={isOwned}>
            <h2 className="character__name">{character.name}</h2>
            <div className="character__img-wrapper">
                <img className="character__img" src={imageURL} alt={`${character.name} Image`} />
            </div>
            <button
                className="character__action"
                onClick={toggleOwned}
            >
                {actionText}
            </button>
        </div>
    )
}