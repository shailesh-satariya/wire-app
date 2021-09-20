import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ShowNavProvider} from "./show-nav-context";


const queryClient = new QueryClient();


interface AppProvidersProps {
    children: JSX.Element;
};

function AppProviders({children}: AppProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ShowNavProvider>
                    {children}
                </ShowNavProvider>
            </Router>
        </QueryClientProvider>
    );
}

export {queryClient, AppProviders};
