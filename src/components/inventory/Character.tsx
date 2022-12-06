import { useOwned } from "../../hooks/inventory";
import { Character as CharacterModel } from "../../inventory";
import "./Character.scss"

interface Properties {
    inventory: number[],
    character: CharacterModel
}

export default function Character({ inventory, character }: Properties) {
    // State determining whether the character is owned
    const [isOwned, toggleOwned] = useOwned(inventory, character.index);
    // Path to the character image
    const imageURL: string = `/assets/characters_full/${character.image}`;
    // Text to be displayed on the toggle button
    const actionText: string = isOwned ? "Remove" : "Add";
    return (
        <div className="character" data-owned={isOwned}>
            <h2 className="character__name">{character.name}</h2>
            <div className="character__img-wrapper">
                <img className="character__img" src={imageURL} alt={`${character.name} Image`} />
            </div>
            <button
                className="character__action"
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )
}