import { Character, CHARACTER_CLASSES } from "../../inventory";
import { useEffect, useState } from "react";

interface Properties {
    inventory: number[];
}

export default function Characters({ inventory }: Properties) {

    return (
        <div className="classes">
            {CHARACTER_CLASSES.map((clazz, index) => (
                <div className="class" key={index}>
                    <h1 className="class__name">{clazz.name}</h1>
                    <div className="class__values">
                        {clazz.values.map((value, index) => (
                            <CharacterElement character={value} inventory={inventory} key={index} />
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )

}

interface CharacterProperties {
    character: Character,
    inventory: number[],
}

function CharacterElement({ character, inventory }: CharacterProperties) {
    const imageUrl = "/assets/characters_full/" + character.image;
    const [owned, setOwnedImpl] = useState(inventory[character.index] > 0);

    function setOwned() {
        inventory[character.index] = 1;
        setOwnedImpl(true);
    }

    function clearOwned() {
        inventory[character.index] = 0;
        setOwnedImpl(false);
    }

    let content;
    if (owned) {
        content = (
            <button className="button character__button character__button--remove"
                onClick={clearOwned}>
                Remove
            </button>
        )
    } else {
        content = (
            <button
                className="button character__button character__button--add"
                onClick={setOwned}
            >
                Add
            </button>
        )
    }

    return (
        <div className="character">
            <img src={imageUrl} alt="" className="character__image" />
            <div className="character__details">
                <h2 className="character__name">{character.name}</h2>
                {content}
            </div>
        </div>
    )
}