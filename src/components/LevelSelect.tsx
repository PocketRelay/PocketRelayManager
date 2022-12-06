import { ChangeEvent } from "react";
import "./LevelSelect.scss";

interface LevelProperties {
    level: number;
    setLevel(value: number): void;
    max: number;
    disabled: boolean
}

export default function LevelSelect({ level, setLevel, max, disabled }: LevelProperties) {

    function setLevelEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setLevel(valueInt);
    }

    return (
        <div className="level" data-disabled={disabled}>
            <label className="level__input input">
                <span className="level__input__name input__name">Level</span>
                <input
                    disabled={disabled}
                    className="input__value"
                    type="number"
                    value={level}
                    onChange={setLevelEvent} />
            </label>
            <div className="level__actions">
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(1)}
                    title="Set the level to the minimum level (1)"
                    disabled={disabled}
                >
                    Min
                </button>
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(max)}
                    title="Set the level to the max normal level"
                    disabled={disabled}
                >
                    Max
                </button>
                <button
                    className="level__actions__button"
                    onClick={() => setLevel(255)}
                    title="Set the level to the max cheated level"
                    disabled={disabled}
                >
                    GOD
                </button>
            </div>
        </div>
    )
}