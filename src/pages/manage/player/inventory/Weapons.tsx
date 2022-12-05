import { useState } from "react";
import Weapon from "../../../../components/inventory/Weapon";
import { WeaponCategory as WeaponCategoryModel, WEAPON_CATEGORIES } from "../../../../inventory";


import "./Weapons.scss";

interface Properties {
    inventory: number[];
}

export default function Weapons({ inventory }: Properties) {
    return (
        <div className="weapon-categories">
             {WEAPON_CATEGORIES.map((category, index) => (
                <WeaponCategory inventory={inventory} category={category} key={index} />
            ))}
        </div>
    )
}

function WeaponCategory({ inventory, category }: { inventory: number[], category: WeaponCategoryModel }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function toggleCollapse() {
        setCollapsed(value => !value);
    }
    return (
        <div className="weapon-category">
            <div className="weapon-category__header">
            <button onClick={toggleCollapse} className="button class__button">{isCollapsed ? "Expand" : "Collapse"}</button>
                <h1 className="weapon-category__name">
                    {category.name}
                </h1>
            </div>
            <div className="weapon-category__weapons" data-collapsed={isCollapsed}>
                {category.values.map((weapon, index) => (
                    <Weapon inventory={inventory} weapon={weapon} key={index} />
                ))}
            </div>
        </div>
    )
}