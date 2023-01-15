import {
    TieredConsumable as TieredConsumableModel,
    CoreConsumable as CoreConsumableModel,
    OtherConsumable as OtherConsumableModel,
    UNSAFE_MAX,
} from "@data/inventory";
import "./Consumable.scss"
import { useEffect, useState } from "react";
import { handleNumberInput } from "@hooks/number";

export function TieredConsumable({ inventory, consumable }: { inventory: number[], consumable: TieredConsumableModel }) {
    // Path to the weapon image
    const imageURL: string = `/assets/consumables/${consumable.image}`;
    // The names of the different tier levels
    const tierNames = ["I", "II", "III", "IV", "V"]

    return (
        <div className="card" data-owned="true">
            <h2 className="card__name">{consumable.name}</h2>
            <div className="card__img-wrapper">
                <img className="card__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <div className="tiers">
                {
                    consumable.indexes.map((value, index) => (
                        <ConsumableTier key={index} inventory={inventory} index={value} name={tierNames[index]} />
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
    const [amount, setAmount] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => { setAmount(inventory[index]) }, [inventory, index]);

    // Handle for handling the amount change events
    const setAmountEvent = handleNumberInput(
        0,
        UNSAFE_MAX,
        (value: number) => {
            inventory[index] = value;
            setAmount(value);
        },
    );

    return (
        <div className="tier">
            <span className="tier__name">{name}</span>
            <label className="tier__input input input--small">
                <span className="tier__input__name input__name">Amount</span>
                <input
                    className="input__value"
                    type="number"
                    value={amount}
                    onChange={setAmountEvent} />
            </label>
        </div>
    )
}

export function CoreConsumable({ inventory, consumable }: { inventory: number[], consumable: CoreConsumableModel }) {
    const [stock, setStock] = useState(0);
    const [capacity, setCapacity] = useState(0);

    // Effect for keeping the state up to date with the inventory
    useEffect(() => {
        setStock(inventory[consumable.stock_index]);
        setCapacity(inventory[consumable.capacity_index]);
    }, [inventory, consumable]);


    // Handle for handling the amount change events
    const setStockEvent = handleNumberInput(
        0,
        UNSAFE_MAX,
        (value: number) => {
            inventory[consumable.stock_index] = value;
            setStock(value);
        },
    );

    // Handle for handling the amount change events
    const setCapacityEvent = handleNumberInput(
        0,
        UNSAFE_MAX,
        (value: number) => {
            inventory[consumable.capacity_index] = value;
            setCapacity(value);
        },
    );

    // Path to the weapon image
    const imageURL: string = `/assets/consumables/${consumable.stock_image}`;

    return (
        <div className="card consumable--core" data-owned="true">
            <h2 className="card__name">{consumable.name}</h2>
            <div className="card__img-wrapper">
                <img className="card__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <label className="input input--small">
                <span className="input__name">Capacity</span>
                <input
                    className="input__value"
                    type="number"
                    value={capacity}
                    onChange={setCapacityEvent} />
            </label>
            <label className="input input--small">
                <span className="input__name">Stock</span>
                <input
                    className="input__value"
                    type="number"
                    value={stock}
                    onChange={setStockEvent} />
            </label>
        </div>
    )
}

export function OtherConsumable({ inventory, consumable }: { inventory: number[], consumable: OtherConsumableModel }) {
    const [amount, setAmount] = useState(0);
    const index = consumable.index;

    // Effect for keeping the state up to date with the inventory
    useEffect(() => { setAmount(inventory[index]) }, [inventory, consumable.index]);

    // Handle for handling the amount change events
    const setAmountEvent = handleNumberInput(
        0,
        UNSAFE_MAX,
        (value: number) => {
            inventory[index] = value;
            setAmount(value);
        },
    );

    // Path to the weapon image
    const imageURL: string = `/assets/consumables/${consumable.image}`;

    return (
        <div className="card" data-owned="true">
            <h2 className="card__name">{consumable.name}</h2>
            <div className="card__img-wrapper">
                <img className="card__img" src={imageURL} alt={`${consumable.name} Image`} />
            </div>
            <label className="input input--small">
                <span className="input__name">Count</span>
                <input
                    className="input__value"
                    type="number"
                    value={amount}
                    onChange={setAmountEvent} />
            </label>
        </div>
    )
}
