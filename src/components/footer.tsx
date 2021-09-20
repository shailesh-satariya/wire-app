import React, {ReactElement} from "react";

function Footer(): ReactElement {
    return (
        <footer className="bd-footer py-2 mt-2 bg-light">
            <div className="container py-2">
                <small>Copyright © 2021 Wire GmbH. All rights reserved.</small>
            </div>
        </footer>
    );
}

export default Footer;