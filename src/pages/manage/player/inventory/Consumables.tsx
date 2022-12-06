import { useState } from "react";
import { CoreConsumable, OtherConsumable, TieredConsumable } from "../../../../components/inventory/Consumable";
import Weapon from "../../../../components/inventory/Weapon";
import { ConsumableCategory, CONSUMABLES, CORE_CONSUMABLES, OTHER_CONSUMABLES, WeaponCategory as WeaponCategoryModel, WEAPON_CATEGORIES } from "../../../../inventory";


import "./Consumables.scss";

interface Properties {
    inventory: number[];
}

export default function Consumables({ inventory }: Properties) {
    return (
        <div className="consumable-categories">
            <BasicCategory inventory={inventory} />
            {CONSUMABLES.map((category, index) => (
                <TierCategory inventory={inventory} category={category} key={index} />
            ))}
        </div>
    )
}

function BasicCategory({ inventory }: { inventory: number[] }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function toggleCollapse() {
        setCollapsed(value => !value);
    }
    return (
        <div className="consumable-category">
            <div className="consumable-category__header">
                <button onClick={toggleCollapse} className="button class__button">{isCollapsed ? "Expand" : "Collapse"}</button>
                <h1 className="consumable-category__name">
                    Basic
                </h1>
            </div>
            <div className="consumable-category__consumables" data-collapsed={isCollapsed}>
                {CORE_CONSUMABLES.map((consumable, index) => (
                    <CoreConsumable inventory={inventory} consumable={consumable} key={index} />
                ))}
                {OTHER_CONSUMABLES.map((consumable, index) => (
                    <OtherConsumable inventory={inventory} consumable={consumable} key={index} />
                ))}
            </div>
        </div>
    )
}

function TierCategory({ inventory, category }: { inventory: number[], category: ConsumableCategory }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function toggleCollapse() {
        setCollapsed(value => !value);
    }
    return (
        <div className="consumable-category">
            <div className="consumable-category__header">
                <button onClick={toggleCollapse} className="button class__button">{isCollapsed ? "Expand" : "Collapse"}</button>
                <h1 className="consumable-category__name">
                    {category.name}
                </h1>
            </div>
            <div className="consumable-category__consumables" data-collapsed={isCollapsed}>
                {category.values.map((consumable, index) => (
                    <TieredConsumable inventory={inventory} consumable={consumable} key={index} />
                ))}
            </div>
        </div>
    )
}