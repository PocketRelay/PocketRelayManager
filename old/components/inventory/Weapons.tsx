import { Dispatch, SetStateAction, useState } from "react";
import { WEAPON_CATEGORIES, Weapon } from "../../inventory";

import "./Weapons.css";

interface LevelButtonProps {
    max: number,
    level: number,
    setLevel: (value: number) => void,
}

function LevelButton({ max, level, setLevel }: LevelButtonProps) {
    function decreaseLevel() {
        setLevel(level > 0 ? level - 1 : 0);
    }

    function increaseLevel() {
        setLevel( level < max ? level + 1 : max);
    }

    return <div>
        <button onClick={decreaseLevel}>-</button>
        <span>{level}</span>
        <button onClick={increaseLevel}>+</button>
    </div>
}

function WeaponElm({ weapon, inventory }: { weapon: Weapon, inventory: number[] }) {
    const image_url = "/assets/weapons/" + weapon.image;

    const [level, setLevelImpl] = useState(inventory[weapon.level_index]);
    const [owned, setOwned] = useState(inventory[weapon.level_index] > 0);

    function setLevel(level: number) {
        if (level == 0) {
            inventory[weapon.level_index] = 0;
            setOwned(false);
        } else {
            inventory[weapon.level_index] = level;
            setOwned(true);
        }
        setLevelImpl(level);
    }



    let button;
    if (owned) {



        button = (
            <div>
                <LevelButton level={level} setLevel={setLevel} max={10} />
                <button onClick={() => setLevel(0)}>Remove</button>
            </div>
        )
    } else {


        button = (
            <div>
                <button onClick={() => setLevel(1)}>Add</button>
            </div>
        )
    }

    return (
        <div className="weapon">
            <img src={image_url} className="weapon__image" />
            <div className="weapon__details">
                <h2 className="weapon__name">{weapon.name}</h2>
                {button}
            </div>
        </div>
    )
}

interface WeaponsProperties {
    inventory: number[],
}


export default function Weapons({ inventory }: WeaponsProperties) {

    return (
        <div className="weapons">
            {WEAPON_CATEGORIES.map((category, index) => (
                <div className="weapon_category" key={index}>
                    <h1>{category.name}</h1>
                    <div className="weapons_value">
                        {category.values.map((value, index) => <WeaponElm key={index} weapon={value} inventory={inventory} />)}
                    </div>
                </div>
            ))}

        </div>
    )

}