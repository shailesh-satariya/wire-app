import React, {ReactElement} from "react";
import {ErrorBoundary} from "react-error-boundary";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import SideNav from "./components/side-nav";
import Screens from "./screens";
import ErrorMessage from "./components/error-message";

function ErrorFallback({error}: { error: Error }): ReactElement {
    return (
        <ErrorMessage error={error.message || null}/>
    );
}

function App(): ReactElement {
    return (
        <div className="d-flex flex-column vh-100">
            <Header/>
            <div className="container-xxl bd-layout flex-grow-1">
                <SideNav/>
                <main className="bd-main order-1 p-3">
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Screens/>
                    </ErrorBoundary>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
