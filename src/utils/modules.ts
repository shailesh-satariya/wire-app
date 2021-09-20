import * as React from "react";
import {useQuery, UseQueryResult} from "react-query";
import {useClient} from "./client";
import {ModuleInterface} from "interfaces/module-interface";
import {Client} from "./api-client";
import {queryClient} from "context";
import {UseQueryOptions} from "react-query/types/react/types";
import {QueryKey} from "react-query/types/core/types";
import {ErrorInterface} from "../interfaces/error-interface";
import {QueryParamsInterface} from "../interfaces/query-params-interface";
import {objectToQueryParams} from "./generic";

const getModuleKey = (platform: string, name: string): string => {
    return `${platform}-${name}`;
};

const getModuleSearchConfig = (client: Client, params: QueryParamsInterface = {}): UseQueryOptions<unknown, ErrorInterface, ModuleInterface[], QueryKey> => ({
        queryKey: ["moduleSearch", params],
        queryFn: () => {
            const queryParams = objectToQueryParams(params as Record<string, string | number>);
            return client(`search?${queryParams}`);
        },
        onSuccess: (data) => {
            if (Array.isArray(data)) {
                const modules: ModuleInterface[] = data as any as ModuleInterface[];
                for (const module of modules) {
                    queryClient.setQueryData(
                        ["module", {moduleKey: getModuleKey(module.platform, module.name)}],
                        module
                    );
                }
            }
        }
    })
;

function useModuleSearch(params: QueryParamsInterface): UseQueryResult<unknown, ErrorInterface> & { modules: ModuleInterface[] } {
    const client = useClient();
    const result = useQuery<unknown, ErrorInterface, ModuleInterface[]>(getModuleSearchConfig(client, params));
    return {...result, modules: result.data ?? []};
}

function useModule(platform: string, name: string): ModuleInterface | undefined {
    const client = useClient();
    const {data} = useQuery<unknown, unknown, ModuleInterface>({
        queryKey: ["module", {moduleKey: getModuleKey(platform, name)}],
        queryFn: () => client(`modules/${platform}/${name}`).then(data => data.module)
    });
    return data;
}

function useRefetchModuleSearchQuery(params: QueryParamsInterface): () => void {
    const client = useClient();
    return React.useCallback(
        async function refetchModuleSearchQuery() {
            queryClient.removeQueries("moduleSearch");
            await queryClient.prefetchQuery(getModuleSearchConfig(client, params));
        },
        [client, params]
    );
}

function setQueryDataForModule(module: ModuleInterface): void {
    queryClient.setQueryData(["module", {moduleId: module.id}], module);
}

export {useModule, useModuleSearch, useRefetchModuleSearchQuery, setQueryDataForModule};
