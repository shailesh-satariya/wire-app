import {v4 as uuid} from "uuid";

function getRecordId(obj: Record<string, any>): string {
    const key: string = "_uuid";
    if (!(obj[key])) {
        const pd: PropertyDescriptor = {value: uuid()};
        Object.defineProperty(obj, key, pd);
    }

    return obj[key].toString();
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function objectToQueryParams(params: Record<string, string | number>): string {
    const usp = new URLSearchParams();

    let key: string;
    for (key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
            usp.set(key, params[key].toString());
        }
    }

    return usp.toString();
}

function insertParamsToUrl(url: string, params: Record<string, string | number>): string {
    const urlObj = new URL(url);

    let key: string;
    for (key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
            urlObj.searchParams.set(key, params[key].toString());
        }
    }

    return urlObj.toString();
}

export {getRecordId, capitalizeFirstLetter, objectToQueryParams, insertParamsToUrl};