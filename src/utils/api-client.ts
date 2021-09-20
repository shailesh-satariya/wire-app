import {insertParamsToUrl} from "./generic";

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY as string;

export type ClientOptions = RequestInit & {
    data?: any;
    headers?: Record<string, any>;
};

export type Client = (endpoint: string, options?: ClientOptions) => Promise<any>;

const client: Client = async function (
    endpoint: string,
    {data, headers: customHeaders = {}, ...customConfig}: ClientOptions = {}
): Promise<any> {
    const requestHeaders: HeadersInit = new Headers();
    if (data) {
        requestHeaders.set("Content-Type", "application/json");
    }
    for (const key in customHeaders) {
        if (Object.prototype.hasOwnProperty.call(customHeaders, key)) {
            requestHeaders.set(key, customHeaders[key]);
        }
    }

    const config: RequestInit = {
        method: data ? "POST" : "GET",
        body: data ? JSON.stringify(data) : undefined,
        headers: requestHeaders,
        ...customConfig
    };

    const url = insertParamsToUrl(`${apiURL}/${endpoint}`, {api_key: apiKey});
    return fetch(url, config).then(async response => {
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
};

export {client};
