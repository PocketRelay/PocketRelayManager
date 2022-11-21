import Characters from "./Characters";


export interface InventoryProperties {
    inventory: InventoryState,
}


export type InventoryState = [number[], (values: number[]) => void]

export default function Inventory(props: InventoryProperties) {


    return (
        <Characters inventory={props.inventory} />
    )
}

