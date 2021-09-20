import React, {ReactElement} from "react";
import NavLink from "./nav-link";
import {useShowNavContext} from "../context/show-nav-context";

function SideNav(): ReactElement {
    const [showNav] = useShowNavContext();

    return (
        <aside className="bd-sidebar">
            <nav className={"collapse bd-links" + (showNav ? " show" : "")} id="bd-docs-nav"
                 aria-label="Docs navigation">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/modules" className="nav-link">Modules</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className="nav-link">About</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default SideNav;