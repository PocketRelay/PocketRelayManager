import { useAmount } from "@hooks/inventory";
import {
    TieredConsumable as TieredConsumableModel,
    CoreConsumable as CoreConsumableModel,
    OtherConsumable as OtherConsumableModel,
} from "@data/inventory";
import "./Consumable.scss"

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
    const [amount, setAmountEvent] = useAmount(inventory, index);
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
    const [stock, setStockEvent] = useAmount(inventory, consumable.stock_index);
    const [capacity, setCapacityEvent] = useAmount(inventory, consumable.capacity_index);

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
    const [amount, setAmountEvent] = useAmount(inventory, consumable.index);

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
