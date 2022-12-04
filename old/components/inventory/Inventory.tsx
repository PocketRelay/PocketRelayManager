import { Dispatch, SetStateAction, useState } from "react";
import Characters from "./Characters";
import Consumables from "./Consumables";
import Gears from "./Gear";
import WeaponMods from "./WeaponMods";
import Weapons from "./Weapons";


export interface InventoryProperties {
    inventory: number[],
}


export default function Inventory(props: InventoryProperties) {


    const [selected, setSelected] = useState('characters')

    let content;

    if (selected == 'characters') {
        content = <Characters inventory={props.inventory} />
    } else if (selected == 'weapons') {
        content = <Weapons inventory={props.inventory}/>
    } else if (selected == 'weapon-mods') {
        content = <WeaponMods inventory={props.inventory}/>
    } else if (selected == 'consumables') {
        content = <Consumables inventory={props.inventory}/>
    }else if (selected == 'gear') {
        content = <Gears inventory={props.inventory}/>
    }


    return (
        <div className="inventory">
            <div className="inventory__nav">
                <button onClick={() => setSelected('characters')}>
                    Characters
                </button>
                <button onClick={() => setSelected('weapons')}>
                    Weapons
                </button>
                <button onClick={() => setSelected('weapon-mods')}>
                    Weapon Mods
                </button>
                <button onClick={() => setSelected('consumables')}>
                    Consumables
                </button>
                <button onClick={() => setSelected('gear')}>
                    Gear
                </button>
            </div>
            <div className="inventory__content">
                {content}
            </div>
        </div>
    )
}

