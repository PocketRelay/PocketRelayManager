import { CHARACTER_CLASSES } from "../../../../inventory";
import Character from "../../../../components/inventory/Character";
import Collapse from "../../../../components/Collapse";

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
        <div className="collapse-list">
            {CHARACTER_CLASSES.map((characterClass, index) => (
                <Collapse name={characterClass.name} key={index}>
                    {characterClass.values.map((character, index) => (
                        <Character inventory={inventory} character={character} key={index} />
                    ))}
                </Collapse>
            ))}
        </div>
    )
}