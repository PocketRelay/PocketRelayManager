// Inventory react hooks

import { ChangeEvent, useEffect, useState } from "react";


type ToggleOwnedFn = () => void;

/**
 * Hook for using an owned value from the inventory
 * 
 * @param inventory The inventory 
 * @param index The item index
 */
export function useOwned(inventory: number[], index: number): [boolean, ToggleOwnedFn] {
    const [isOwned, setOwnedImpl] = useState(false);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setOwnedImpl(inventory[index] > 0)
    }, [inventory, index])

    /**
     * Function for toggling between the owned and not owned states
     */
    function toggleOwned() {
        setOwnedImpl(owned => {
            let value = !owned;
            inventory[index] = value ? 1 : 0;
            return value;
        })
    }

    return [isOwned, toggleOwned]
}

type ChangeEventFn = (event: ChangeEvent<HTMLInputElement>) => void;

export function useAmount(inventory: number[], index: number): [number, ChangeEventFn] {
    const [level, setLevelImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setLevelImpl(inventory[index])
    }, [inventory, index])


    /**
     * Wrapping function for updating the level state as
     * well as the level in the actual inventory array
     * 
     * @param level The level value
     */
    function setAmount(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[index] = level;
        setLevelImpl(level);
    }

    function setAmountEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setAmount(valueInt);
    }

    return [level, setAmountEvent]

}