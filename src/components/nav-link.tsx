import React, {ReactElement} from "react";
import {Link, LinkProps, useRouteMatch} from "react-router-dom";

function NavLink({className, ...rest}: LinkProps): ReactElement {
    const match = useRouteMatch(rest?.to.toString());
    return (
        <Link className={className + (match && match.isExact ? " fw-bold" : "")} {...rest} />
    );
}

export default NavLink;