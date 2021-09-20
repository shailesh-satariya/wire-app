import React from "react";
import {render as rtlRender, screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {AppProviders} from "context";

async function render(ui: React.ReactElement, {route = "", ...renderOptions} = {}) {
    window.history.pushState({}, "Test page", route);

    const returnValue = {
        ...rtlRender(ui, {
            wrapper: AppProviders as any as React.ComponentType,
            ...renderOptions
        })
    };

    // wait for react-query to settle before allowing the test to continue
    await waitForLoadingToFinish();

    return returnValue;
}

const waitForLoadingToFinish = () =>
    waitForElementToBeRemoved(screen.queryAllByLabelText(/loading/i),
        {timeout: 10000}
    );

export * from "@testing-library/react";
export {render, userEvent, waitForLoadingToFinish};
