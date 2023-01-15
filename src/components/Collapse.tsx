import { PropsWithChildren, useState } from "react";
import "./Collapse.scss";

interface Properties {
    // The name to display in the heading section
    name: string;
}

/**
 * Component for a collapsable section with a header and collapsable
 * child element 
 * 
 * @param name     The name to use in the collapse heading
 * @param children The children to render inside the open collapse
 */
export default function Collapse({ name, children }: PropsWithChildren<Properties>) {
    const [isCollapsed, setCollapsed] = useState(true);

    // Action for the button to change the collapsed state when clicked
    const buttonAction = () => setCollapsed(value => !value);
    // Text for the button to display based on the collapsed state
    const buttonText = isCollapsed ? "Expand" : "Collapse";

    return (
        <div className="collapse" data-collapsed={isCollapsed}>
            <div className="collapse__header">
                <button
                    onClick={buttonAction}
                    className="collapse__header__button">
                    {buttonText}
                </button>
                <h1 className="collapse__header__name">
                    {name}
                </h1>
            </div>

            <div className="collapse__value">
                {children}
            </div>
        </div>
    );
}