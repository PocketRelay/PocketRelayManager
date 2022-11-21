import { InventoryState } from "../Inventory";
import { Character, CHARACTER_CLASSES } from "../../inventory";
import { useEffect, useState } from "react";

interface Properties {
    inventory: InventoryState;
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

function CharacterElement({ character, inventory }: { character: Character, inventory: InventoryState }) {
    const imageUrl = "/assets/characters_full/" + character.image;
    const [values, setValues] = inventory;
    const [owned, setOwned] = useState(values[character.index] > 0);
    let content;
    if (owned) {
        content = (
            <button className="button character__button character__button--remove"
                onClick={() => {
                    values[character.index] = 0;
                    setValues(values);
                    setOwned(false);
                }}>
                Remove
            </button>
        )
    } else {
        content = (
            <button
                className="button character__button character__button--add"
                onClick={() => {
                    values[character.index] = 1;
                    setValues(values);
                    console.log(values);
                    setOwned(true);
                }}
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