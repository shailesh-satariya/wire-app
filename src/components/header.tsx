import React, {ReactElement} from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {useShowNavContext} from "../context/show-nav-context";

function Header(): ReactElement {
    const [, setShowNav] = useShowNavContext();

    return (
        <header className="navbar navbar-expand-md navbar-dark bd-navbar bg-primary">
            <nav className="container-xxl flex-wrap flex-md-nowrap" aria-label="Main navigation">
                <a className="navbar-brand p-0 me-2" href="/" aria-label="Bootstrap">
                    Wire
                </a>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false"
                        aria-label="Toggle navigation" onClick={() => setShowNav(showNav => !showNav)}>
                    <GiHamburgerMenu aria-label="menu"/>

                </button>
            </nav>
        </header>
    );
}

export default Header;