import React from "react";
import {render, screen, userEvent, waitForLoadingToFinish} from "test/app-test-utils";
import data from "test/data.json";
import App from "../App";
import fetchMock from "jest-fetch-mock";

jest.setTimeout(300000);

async function renderModulesScreen(config = {route: "modules"}) {
    const utils = await render(<App/>, config);

    return {...utils};
}

beforeEach(async function () {
    fetchMock.resetMocks();
});

test("renders modules", async () => {
    fetchMock.mockResponse(JSON.stringify(data));
    await renderModulesScreen();
    expect(screen.getByRole("table").textContent).toMatchInlineSnapshot(
        `"NameStarsreact-domhttps://reactjs.org/React package for working with the DOM.174634reacthttps://reactjs.org/React is a JavaScript library for building user interfaces.174634webpackhttps://github.com/webpack/webpackPacks CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.59253@types/nodehttps://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/nodeTypeScript definitions for Node.js35658typescripthttps://www.typescriptlang.org/TypeScript is a language for application scale JavaScript development74160"`
    );

    // Sorting
    const starsLink = screen.getByRole("link", {
        name: /stars/i
    });
    const dataSortedByStars = data.sort((a, b) => b.stars - a.stars);
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(dataSortedByStars));
    userEvent.click(starsLink);
    await waitForLoadingToFinish();
    expect(screen.getByRole("table").textContent).toMatchInlineSnapshot(
        `"NameStarsreact-domhttps://reactjs.org/React package for working with the DOM.174634reacthttps://reactjs.org/React is a JavaScript library for building user interfaces.174634typescripthttps://www.typescriptlang.org/TypeScript is a language for application scale JavaScript development74160webpackhttps://github.com/webpack/webpackPacks CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.59253@types/nodehttps://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/nodeTypeScript definitions for Node.js35658"`
    );

    // Filter
    const input = screen.getByRole("textbox", {name: /search projects/i});
    const btn = screen.getByRole("button", {name: /search ︎/i});
    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    const text = "react";
    const dataFiltered = data.filter((a) => a.name.indexOf(text) > -1);
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(dataFiltered));
    userEvent.type(input, text);
    userEvent.click(btn);

    await waitForLoadingToFinish();
    expect(screen.getByRole("table").textContent).toMatchInlineSnapshot(
        `"NameStarsreact-domhttps://reactjs.org/React package for working with the DOM.174634reacthttps://reactjs.org/React is a JavaScript library for building user interfaces.174634"`
    );
});

test("shows error when fetch fails", async () => {
    fetchMock.mockReject(new Error("Unknown error!"));
    await renderModulesScreen();
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert.classList.contains("alert-danger")).toBe(true);

    expect(alert.textContent).toMatchInlineSnapshot(
        `"There was an error:Unknown error!"`
    );
});
