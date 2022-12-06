import { CHARACTER_CLASSES } from "../../../../inventory";
import Character from "../../../../components/inventory/Character";
import Collapse from "../../../../components/Collapse";
import { InventoryProperties } from "./Inventory";

/**
 * Element for rendering a list of characters that can be collapsed
 * 
 * @param inventory The inventory array of the player
 * @returns 
 */
export default function Characters({ inventory, setInventory }: InventoryProperties) {

    /**
     * Function for unlocking all the characters all at once
     * without needing to 
     */
    function unlockAll() {
        const indexes: number[] = []
        CHARACTER_CLASSES.forEach(value => value.values.forEach(value => indexes.push(value.index)));
        setInventory(inventory.map((value, index) => {
            return indexes.includes(index) ? 1 : value
        }));
    }

    return (
        <div className="inventory__section">
            <div className="inventory__section__header">
                <button className="button" onClick={unlockAll}>
                    Unlock All
                </button>
            </div>
            <div className="inventory__section__value collapse-list">
                {CHARACTER_CLASSES.map((characterClass, index) => (
                    <Collapse name={characterClass.name} key={index}>
                        {characterClass.values.map((character, index) => (
                            <Character inventory={inventory} character={character} key={index} />
                        ))}
                    </Collapse>
                ))}
            </div>
        </div>
    )
}