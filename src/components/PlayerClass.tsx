import { PlayerClassData } from "@pages/player/Classes";
import { ChangeEvent, useEffect, useState } from "react";

interface Properties {
    playerClass: PlayerClassData
}

export default function PlayerClass({ playerClass }: Properties) {
    const [level, setLevel] = useState(0);
    const [promotions, setPromotions] = useState(0);

    useEffect(() => {
        setLevel(playerClass.level);
        setPromotions(playerClass.promotions);
    }, [playerClass]);

    function setLevelEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let level = parseInt(value);
        if (Number.isNaN(level)) {
            level = 0;
        }
        if (level < 0) level = 0;
        if (level > 20) level = 20;
        setLevel(level);
        playerClass.level = level;
    }

    function setPromotionsEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let promotions = parseInt(value);
        if (Number.isNaN(promotions)) {
            promotions = 0;
        }
        if (promotions < 0) promotions = 0;
        if (promotions > 1000) promotions = 1000;
        setPromotions(promotions);
        playerClass.promotions = promotions;
    }

    return (
        <div className="class card" data-owned={true}>
            <div className="class__img-wrapper card__img-wrapper">
                <img className="card__img class__img" src={`/assets/icons/${playerClass.name}.png`}></img>
            </div>
            <h2 className="card__name">{playerClass.name}</h2>
            <label className="input">
                <span className="input__name">Level</span>
                <input
                    className="input__value"
                    type="text"
                    value={level}
                    onChange={setLevelEvent}
                    title="Level"
                    placeholder=""
                />
            </label>

            <label className="input">
                <span className="input__name">Promotions</span>
                <input
                    className="input__value"
                    type="text"
                    value={promotions}
                    onChange={setPromotionsEvent}
                    title="Promotions"
                    placeholder=""
                />
            </label>
        </div>
    )
}