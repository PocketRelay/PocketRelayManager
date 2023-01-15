import { handleNumberInput } from "@hooks/number";
import { PlayerClass as PlayerClassModel } from "@api/parser";
import { useEffect, useState } from "react";

interface Properties {
    playerClass: PlayerClassModel
}

// The maximum level a class can reach
const MAX_CLASS_LEVEL: number = 20;
// The minimum level a class must be 
const MIN_CLASS_LEVEL: number = 0;

// The minimum number of promotions
const MIN_PROMOTIONS: number = 0;
// The maximum number of promotions
const MAX_PROMOTIONS: number = 1000;

/**
 * Component for displaying a player class that has editiable
 * level and promotions fields along with display the name an
 * an image for the class
 * 
 * @param playerClass The player class for this component
 */
export default function PlayerClass({ playerClass }: Properties) {
    const [level, setLevel] = useState(0);
    const [promotions, setPromotions] = useState(0);

    useEffect(() => {
        setLevel(playerClass.level);
        setPromotions(playerClass.promotions);
    }, [playerClass]);

    // Handler function for updating the level state based on the changed input
    const levelHandle = handleNumberInput(
        MIN_CLASS_LEVEL,
        MAX_CLASS_LEVEL,
        (value) => {
            setLevel(value);
            playerClass.level = value;
        });

    // Handler function for updating the promotions state based on the changed input
    const promotionsHandle = handleNumberInput(
        MIN_PROMOTIONS,
        MAX_PROMOTIONS,
        (value) => {
            setPromotions(value);
            playerClass.promotions = value;
        });

    return (
        <div className="card">
            <div className="class__img-wrapper card__img-wrapper">
                <img className="card__img class__img" src={`/assets/icons/${playerClass.name}.png`}></img>
            </div>
            <h2 className="card__name">{playerClass.name}</h2>
            <label className="input">
                <span className="input__name">Level</span>
                <input
                    className="input__value"
                    type="number"
                    value={level}
                    onChange={levelHandle}
                    title="Level" />
            </label>

            <label className="input">
                <span className="input__name">Promotions</span>
                <input
                    className="input__value"
                    type="number"
                    value={promotions}
                    onChange={promotionsHandle}
                    title="Promotions" />
            </label>
        </div>
    )
}