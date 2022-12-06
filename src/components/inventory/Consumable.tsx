import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import {
    TieredConsumable as TieredConsumableModel,
    CoreConsumable as CoreConsumableModel,
    GearConsumable as GearConsumableModel,
    OtherConsumable as OtherConsumableModel,
    GEAR_MAX
} from "../../inventory";
import "./Consumable.scss"

export function TieredConsumable({ inventory, consumable }: { inventory: number[], consumable: TieredConsumableModel }) {
    // Path to the weapon image
    const imageURL: string = `/assets/consumables/${consumable.image}`;
    // The names of the different tier levels
    const tierNames = ["I", "II", "III", "IV", "V"]

    return (
        <div className="consumable">
            <h2 className="consumable__name">{consumable.name}</h2>
            <div className="consumable__img-wrapper">
                <img className="consumable__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <div className="consumable__tiers">
                {
                    consumable.indexes.map((value, index) => (
                        <ConsumableTier inventory={inventory} index={value} name={tierNames[index]} />
                    ))
                }
            </div>
        </div>
    )
}

interface TierProperties {
    inventory: number[];
    index: number;
    name: string;
}

function ConsumableTier({ inventory, index, name }: TierProperties) {
    const [count, setCountImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setCountImpl(inventory[index])
    }, [inventory, index])

    const isOwned = count > 0;

    function toggleOwned() {
        if (isOwned) {
            setCount(0);
        } else {
            setCount(1);
        }
    }

    function setCount(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[index] = level;
        setCountImpl(level);
    }


    function setCountEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setCount(valueInt);
    }

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the consumable from the player inventory" : "Adds the consumable to the player inventory"

    return (
        <div className="tier">
            <span className="tier__name">{name}</span>
            <label className="tier__input input">
                <span className="tier__input__name input__name">Amount</span>
                <input
                    disabled={!isOwned}
                    className="input__value"
                    type="number"
                    value={count}
                    onChange={setCountEvent} />
            </label>
            <button
                className="tier__action"
                title={actionTitle}
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )
}

export function CoreConsumable({ inventory, consumable }: { inventory: number[], consumable: CoreConsumableModel }) {

    const [stock, setStockImpl] = useState(0);
    const [capacity, setCapacityImpl] = useState(0);


    // Path to the weapon image
    const imageURL: string = `/assets/consumables/${consumable.stock_image}`;


    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setStockImpl(inventory[consumable.stock_index]);
        setCapacityImpl(inventory[consumable.capacity_index]);
    }, [inventory, consumable])

    function setStock(stock: number) {
        if (stock < 0) stock = 0;
        if (stock > 255) stock = 255;
        inventory[consumable.stock_index] = stock;
        setStockImpl(stock);
    }

    function setStockEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setStock(valueInt);
    }

    function setCapacity(capacity: number) {
        if (capacity < 0) capacity = 0;
        if (capacity > 255) capacity = 255;
        inventory[consumable.capacity_index] = capacity;
        setCapacityImpl(capacity);
    }


    function setCapacityEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setCapacity(valueInt);
    }

    return (
        <div className="consumable">
            <h2 className="consumable__name">{consumable.name}</h2>
            <div className="consumable__img-wrapper">
                <img className="consumable__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <label className="tier__input input">
                <span className="tier__input__name input__name">Capacity</span>
                <input
                    className="input__value"
                    type="number"
                    value={capacity}
                    onChange={setCapacityEvent} />
            </label>
            <label className="tier__input input">
                <span className="tier__input__name input__name">Stock</span>
                <input
                    className="input__value"
                    type="number"
                    value={stock}
                    onChange={setStockEvent} />
            </label>
        </div>
    )
}

export function GearConsumable({ inventory, consumable }: { inventory: number[], consumable: GearConsumableModel }) {
    const [level, setLevelImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setLevelImpl(inventory[consumable.index])
    }, [inventory, consumable])

    const isOwned = level > 0;
    // Path to the weapon image
    const imageURL: string = `/assets/consumables/${consumable.image}`;

    function setLevel(level: number) {
        if (level < 0) level = 0;
        if (level > 255) level = 255;
        inventory[consumable.index] = level;
        setLevelImpl(level);
    }


    function toggleOwned() {
        if (isOwned) {
            setLevel(0);
        } else {
            setLevel(1);
        }
    }

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the consumable from the player inventory" : "Adds the consumable to the player inventory"

    return (
        <div className="consumable">
            <h2 className="consumable__name">{consumable.name}</h2>
            <div className="consumable__img-wrapper">
                <img className="consumable__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <GearLevel
                level={level}
                setLevel={setLevel}
                max={GEAR_MAX}
                disabled={!isOwned}
            />
            <button
                className="consumable__action"
                title={actionTitle}
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )
}
export function OtherConsumable({ inventory, consumable }: { inventory: number[], consumable: OtherConsumableModel }) {
    const [count, setCountImpl] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setCountImpl(inventory[consumable.index])
    }, [inventory, consumable])

    const isOwned = count > 0;
    // Path to the weapon image
    const imageURL: string = `/assets/consumables/${consumable.image}`;

    function setCount(count: number) {
        if (count < 0) count = 0;
        if (count > 255) count = 255;
        inventory[consumable.index] = count;
        setCountImpl(count);
    }


    function toggleOwned() {
        if (isOwned) {
            setCount(0);
        } else {
            setCount(1);
        }
    }

    const actionText: string = isOwned ? "Remove" : "Add";
    const actionTitle: string = isOwned ? "Removes the consumable from the player inventory" : "Adds the consumable to the player inventory"

    function setCountEvent(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let valueInt = parseInt(value);
        if (Number.isNaN(valueInt)) {
            valueInt = 1;
        }
        setCount(valueInt);
    }

    return (
        <div className="consumable">
            <h2 className="consumable__name">{consumable.name}</h2>
            <div className="consumable__img-wrapper">
                <img className="consumable__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <label className="level__input input">
                <span className="level__input__name input__name">Count</span>
                <input
                    className="input__value"
                    type="number"
                    value={count}
                    onChange={setCountEvent} />
            </label>
            <button
                className="consumable__action"
                title={actionTitle}
                onClick={toggleOwned}>
                {actionText}
            </button>
        </div>
    )
}

interface LevelProperties {
    level: number;
    setLevel(value: number): void;
    max: number;
    disabled: boolean
}

function GearLevel({ level, setLevel, max, disabled }: LevelProperties) {

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