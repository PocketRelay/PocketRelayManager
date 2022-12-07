import { useOwned } from "@hooks/inventory";
import { Character as CharacterModel } from "@data/inventory";

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
        <div className="card" style={{maxWidth: 240}} data-owned={isOwned}>
            <h2 className="card__name">{character.name}</h2>
            <div className="card__img-wrapper">
                <img className="card__img" style={{width:  90}} src={imageURL} alt={`${character.name} Image`} />
            </div>
            <button
                className="card__action"
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )
}