import React, {ReactElement} from "react";

function ClickLink(props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>): ReactElement {
    const {href, onClick, children, ...rest} = props;

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>): void {
        event.preventDefault();
        if (typeof onClick === "function") {
            onClick(event);
        }
    }

    return (
        <a href={href || "#"} onClick={handleClick} {...rest}>{children}</a>
    );
}

export default ClickLink;