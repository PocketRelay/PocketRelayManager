import { useState } from "react";
import { Character, CHARACTER_CLASSES, CharacterClass } from "../inventory";
import "./Character.css";

function CharacterElm({ character }: { character: Character }) {
    const image_url = "/assets/characters_full/" + character.image;
    return (
        <div className="character">
            <img src={image_url} className="character__image" />
            <h2>{character.name}</h2>
        </div>
    )
}

export default function Characters() {
    let values = CHARACTER_CLASSES;

    let [selected, setSelected] = useState(0);

    
    return (
        <div className="classes">
            <div className="classes__nav">
                {values.map((clazz, index) => (
                    <div onClick={() => setSelected(index)}>
                        {clazz.name}
                    </div>
                ))}
            </div>
            <div className="classes_value">
                {values[selected].values.map(value => <CharacterElm character={value} />)}
            </div>
        </div>
    )

}