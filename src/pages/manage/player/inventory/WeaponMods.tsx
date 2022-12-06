import { useState } from "react";
import WeaponMod from "../../../../components/inventory/WeaponMod";
import { WeaponModCategory as WeaponModCategoryModel, WEAPON_MODS } from "../../../../inventory";


import "./WeaponMods.scss";

interface Properties {
    inventory: number[];
}

export default function WeaponMods({ inventory }: Properties) {
    return (
        <div className="weapon-mods-categories">
             {WEAPON_MODS.map((category, index) => (
                <WeaponModCategory inventory={inventory} category={category} key={index} />
            ))}
        </div>
    )
}

function WeaponModCategory({ inventory, category }: { inventory: number[], category: WeaponModCategoryModel }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function toggleCollapse() {
        setCollapsed(value => !value);
    }
    return (
        <div className="weapon-mods-category">
            <div className="weapon-mods-category__header">
            <button onClick={toggleCollapse} className="button class__button">{isCollapsed ? "Expand" : "Collapse"}</button>
                <h1 className="weapon-mods-category__name">
                    {category.name}
                </h1>
            </div>
            <div className="weapon-mods-category__mods" data-collapsed={isCollapsed}>
                {category.values.map((weapon, index) => (
                    <WeaponMod inventory={inventory} weapon={weapon} key={index} />
                ))}
            </div>
        </div>
    )
}