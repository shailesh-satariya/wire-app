import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import {queryClient} from "./context";
import {act, waitFor} from "@testing-library/react";

fetchMock.enableMocks();

afterEach(async () => {
    queryClient.removeQueries();
    await waitFor(() => expect(queryClient.isFetching()).toBe(0));
    if (jest.isMockFunction(setTimeout)) {
        act(() => (jest as any).runOnlyPendingTimers());
        jest.useRealTimers();
    }
});