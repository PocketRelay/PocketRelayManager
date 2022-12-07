import { PlayerClass as PlayerClassModel } from "@api/models";
import { ChangeEvent, useEffect, useState } from "react";

interface Properties {
    playerClass: PlayerClassModel
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
    }

    function setPromotionsEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let level = parseInt(value);
        if (Number.isNaN(level)) {
            level = 0;
        }
        if (level < 0) level = 0;
        if (level > 1000) level = 1000;
        setPromotions(level);
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