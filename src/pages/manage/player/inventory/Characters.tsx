import { CharacterClass as CharacterClassModel, CHARACTER_CLASSES } from "../../../../inventory";

import Character from "../../../../components/inventory/Character";
import { useState } from "react";

import "./Characters.scss";

// Properties passed to the characters element
interface Properties {
    // The inventory array of the player
    inventory: number[],
}

/**
 * Element for rendering a list of characters that can be collapsed
 * 
 * @param inventory The inventory array of the player
 * @returns 
 */
export default function Characters({ inventory }: Properties) {
    return (
        <div className="classes">
            {CHARACTER_CLASSES.map((characterClass, index) => (
                <CharacterClass inventory={inventory} characterClass={characterClass} key={index} />
            ))}
        </div>
    )
}

function CharacterClass({ inventory, characterClass }: { inventory: number[], characterClass: CharacterClassModel }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function toggleCollapse() {
        setCollapsed(value => !value);
    }

    return (
        <div className="class">
            <div className="class__header">
                <button onClick={toggleCollapse} className="button class__button">{isCollapsed ? "Expand" : "Collapse"}</button>
                <h1 className="class__name">
                    {characterClass.name}
                </h1>
            </div>

            <div className="class__characters" data-collapsed={isCollapsed}>
                {characterClass.values.map((character, index) => (
                    <Character inventory={inventory} character={character} key={index} />
                ))}
            </div>
        </div>
    );
}