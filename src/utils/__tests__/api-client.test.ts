import {client, ClientOptions} from "../api-client";
import fetchMock from "jest-fetch-mock";

beforeEach(async function () {
    fetchMock.resetMocks();
});

test("calls fetch at the endpoint with the arguments for GET requests", async () => {
    const endpoint = "test-endpoint";
    const mockResult = {mockValue: "VALUE"};
    fetchMock.mockResponseOnce(JSON.stringify(mockResult));

    const result = await client(endpoint);

    expect(result).toEqual(mockResult);
});

test("allows for config overrides", async () => {
    let request: Request;
    const endpoint = "test-endpoint";
    const mockResult = {mockValue: "VALUE"};
    fetchMock.mockResponse(async (req: Request) => {
        request = req;
        return Promise.resolve(JSON.stringify(mockResult));
    });

    const customConfig: ClientOptions = {
        redirect: "manual",
        headers: {"Content-Type": "fake-type"}
    };

    await client(endpoint, customConfig);

    expect(request!.redirect).toBe(customConfig.redirect);
    expect(request!.headers.get("Content-Type")).toBe(customConfig?.headers!["Content-Type"]);
});

test("when data is provided, it is stringified and the method defaults to POST", async () => {
    const endpoint = "test-endpoint";
    fetchMock.mockResponse(async (req: Request) => {
        return Promise.resolve((req.body as any).toString());
    });
    const data = {a: "b"};
    const result = await client(endpoint, {data});

    expect(result).toEqual(data);
});

test("correctly rejects the promise if there's an error", async () => {
    const testError = {message: "Test error"};
    const endpoint = "test-endpoint";
    fetchMock.mockRejectOnce(new Error(testError.message));

    const error = await client(endpoint).catch(e => e);

    expect(error.message).toEqual(testError.message);
});
