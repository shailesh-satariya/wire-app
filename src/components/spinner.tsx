import React, {ReactElement} from "react";
import {FaSpinner} from "react-icons/fa";
import "./spinner.css";

function Spinner(): ReactElement {
    return (
        <FaSpinner aria-label="loading" className="spinner"/>
    );
}

export default Spinner;