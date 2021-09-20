import React, {ReactElement} from "react";

function FullPageErrorFallback({error}: { error: any }): ReactElement {
    return (
        <div
            role="alert"
            className="alert alert-error"
        >
            <p>Uh oh... There is a problem. Try refreshing the app.</p>
            <pre>{error.message}</pre>
        </div>
    );
}

export default FullPageErrorFallback;