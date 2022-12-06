import LeveledCard from "../../../../components/inventory/LeveledCard";
import { GEAR_CONSUMABLES, GEAR_MAX } from "../../../../inventory";
import "./Gear.scss";

interface Properties {
    inventory: number[];
}

export default function Gear({ inventory }: Properties) {
    return (
        <div className="gears">
            {GEAR_CONSUMABLES.map((gear, index) => (
                <LeveledCard
                    key={index}
                    inventory={inventory}
                    index={gear.index}
                    name={gear.name}
                    imageURL={`/assets/gear/${gear.image}`}
                    imageHeight={120}
                    max={GEAR_MAX}
                />
            ))}
        </div>
    )
}

