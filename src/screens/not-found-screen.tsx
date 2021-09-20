import React from "react";
import {Link} from "react-router-dom";

function NotFoundScreen() {
    return (
        <div
            className="">
            <div>
                Sorry... nothing here. <Link to="/">Go home</Link>
            </div>
        </div>
    );
}

export default NotFoundScreen;
