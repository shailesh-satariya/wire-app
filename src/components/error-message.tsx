import React, {ReactElement} from "react";

function ErrorMessage({error}: { error: string | null | undefined }): ReactElement {
    return (
        <div className="alert alert-danger" role="alert">
            There was an error:
            <pre>{error ? error : null}</pre>
        </div>
    );
}

export default ErrorMessage;