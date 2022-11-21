import { useState } from "react";
import { Character, CHARACTER_CLASSES, CharacterClass } from "../inventory";
import "./Character.css";
import { InventoryState } from "./Inventory";



function CharacterElm({ character, inventory: [values, setValues] }: { character: Character, inventory: InventoryState }) {
    const image_url = "/assets/characters_full/" + character.image;
    let owned = values[character.index] > 0;
    let button;
    if (owned) {
        button = (
            <button>Remove</button>
        )
    } else {
        button = (
            <button>Add</button>
        )
    }

    return (
        <div className="character">
            <img src={image_url} className="character__image" />
            <div className="character__details">
                <h2 className="character__name">{character.name}</h2>
                {button}
            </div>
        </div>
    )
}

interface CharactersProperties {
    inventory: InventoryState,
}


export default function Characters({ inventory }: CharactersProperties) {

    return (
        <div className="classes">
            {CHARACTER_CLASSES.map((clazz, index) => (
                <div className="class" key={index}>
                    <h1>{clazz.name}</h1>
                    <div className="classes_value">
                        {clazz.values.map((value, index) => <CharacterElm key={index} character={value} inventory={inventory} />)}
                    </div>
                </div>
            ))}

        </div>
    )

}