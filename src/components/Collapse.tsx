import { ReactNode, useState } from "react";
import "./Collapse.scss";

interface Properties {
    name: string;
    children: ReactNode;
}

export default function Collapse({ name, children }: Properties) {
    const [isCollapsed, setCollapsed] = useState(true);

    function toggleCollapse() {
        setCollapsed(value => !value);
    }

    return (
        <div className="collapse" data-collapsed={isCollapsed}>
            <div className="collapse__header">
                <button onClick={toggleCollapse} className="collapse__header__button">{isCollapsed ? "Expand" : "Collapse"}</button>
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