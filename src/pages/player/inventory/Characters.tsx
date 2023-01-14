import { CHARACTER_CLASSES, MAX_CHARACTER_LEVEL } from "@data/inventory";
import Collapse from "@components/Collapse";
import { InventoryProperties } from "../Inventory";
import LeveledCard from "@components/inventory/LeveledCard";
import "./Characters.scss"

/**
 * Element for rendering a list of characters that can be collapsed
 * 
 * @param inventory The inventory array of the player
 * @returns 
 */
export default function Characters({ inventory, setInventory }: InventoryProperties) {

    /**
     * Function for setting the level of all the characters
     */
    function setLevelAll(level: number) {

        const indexes: number[] = []
        CHARACTER_CLASSES.forEach(value => value.values.forEach(value => indexes.push(value.index)));
        setInventory(inventory.map((value, index) => {
            return indexes.includes(index) ? level : value
        }));

    }

    return (
        <div className="list__contents">
            <h1 className="list__contents__title">Characters</h1>
            <div className="list__contents__header">
                <button className="button" onClick={() => setLevelAll(1)}>
                    Unlock All
                </button>
                <button className="button" onClick={() => setLevelAll(MAX_CHARACTER_LEVEL)}>
                    Max Level All
                </button>
                <button className="button" onClick={() => setLevelAll(255)}>
                    God Level All
                </button>
            </div>
            <div className="list__contents__value collapse-list characters">
                {CHARACTER_CLASSES.map((characterClass, index) => (
                    <Collapse name={characterClass.name} key={index}>
                        {characterClass.values.map((character, index) => (
                            <LeveledCard
                                key={index}
                                inventory={inventory}
                                index={character.index}
                                name={character.name}
                                imageURL={`/assets/characters_full/${character.image}`}
                                imageHeight={320}
                                max={MAX_CHARACTER_LEVEL}
                            />
                        ))}
                    </Collapse>
                ))}
            </div>
        </div>
    )
}