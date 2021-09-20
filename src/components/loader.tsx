import React, {ReactElement} from "react";

function Loader(): ReactElement {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default Loader;