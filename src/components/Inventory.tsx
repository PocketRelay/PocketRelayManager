import { useState } from "react";
import Characters from "./Characters";
import Weapons from "./Weapons";


export interface InventoryProperties {
    inventory: InventoryState,
}


export type InventoryState = [number[], (values: number[]) => void]

export default function Inventory(props: InventoryProperties) {


    const [selected, setSelected] = useState('characters')

    let content;

    if (selected == 'characters') {
        content = <Characters inventory={props.inventory} />
    } else if (selected == 'weapons') {
        content = <Weapons inventory={props.inventory}/>
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
