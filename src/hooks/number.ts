import { ChangeEvent } from "react"

// Type for an event handler taking events from an input element
type NumberInputHandler = (event: ChangeEvent<HTMLInputElement>) => void;

/**
 * Function which provides event handler functions for
 * setting a number state based on an input that should
 * produce a number clamped between a min and max value
 * 
 * @param min      The min clamp value
 * @param max      The max clamp value
 * @param setState The function for updating the number state
 * @returns        A function for handling the input change event
 */
export function handleNumberInput(
    min: number,
    max: number,
    setState: (value: number) => void,
): NumberInputHandler {
    return (event: ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        let parsed: number = parseInt(value);
        // Handling for non number values
        if (Number.isNaN(parsed)) parsed = 0;
        if (parsed < min) parsed = min;
        if (parsed > max) parsed = max;
        setState(parsed);
    }
}