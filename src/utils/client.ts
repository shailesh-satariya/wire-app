import * as React from "react";
import {client, Client} from "./api-client";

const useClient: () => Client = function () {
    return React.useCallback(
        (endpoint, config) => client(endpoint, config),
        []
    );
};

export {useClient};
