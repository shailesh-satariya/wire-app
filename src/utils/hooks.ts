import React from "react";

function useSafeDispatch(dispatch: Function) {
    const mounted = React.useRef(false);
    React.useLayoutEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    return React.useCallback(
        (...args) => (mounted.current ? dispatch(...args) : 0),
        [dispatch]
    );
}

export interface UseAsyncState {
    // using the same names that react-query uses for convenience
    isIdle: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;

    setData: (data: any) => void;
    setError: (error: any) => void;
    error: any;
    status: "idle" | "pending" | "rejected" | "resolved";
    data: any;
    run: (p: Promise<any>) => Promise<any>;
    reset: () => void;
}

const defaultInitialState: Partial<UseAsyncState> = {status: "idle", data: null, error: null};

function useAsync(initialState: Partial<UseAsyncState> = {}): UseAsyncState {
    const initialStateRef = React.useRef({
        ...defaultInitialState,
        ...initialState
    });
    const [{status, data, error}, setState] = React.useReducer(
        (s: any, a: any) => ({...s, ...a}),
        initialStateRef.current
    );

    const safeSetState = useSafeDispatch(setState);

    const setData = React.useCallback(
        data => safeSetState({data, status: "resolved"}),
        [safeSetState]
    );
    const setError = React.useCallback(
        error => safeSetState({error, status: "rejected"}),
        [safeSetState]
    );
    const reset = React.useCallback(
        () => safeSetState(initialStateRef.current),
        [safeSetState]
    );

    const run = React.useCallback(
        promise => {
            if (!promise || !promise.then) {
                throw new Error(
                    "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"
                );
            }
            safeSetState({status: "pending"});
            return promise.then(
                (data: any) => {
                    setData(data);
                    return data;
                },
                (error: any) => {
                    setError(error);
                    return Promise.reject(error);
                }
            );
        },
        [safeSetState, setData, setError]
    );

    return {
        // using the same names that react-query uses for convenience
        isIdle: status === "idle",
        isLoading: status === "pending",
        isError: status === "rejected",
        isSuccess: status === "resolved",

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset
    };
}

export {useAsync};
