import React, {ReactElement} from "react";
import {FaHome, FaSearch, FaTimes} from "react-icons/fa";
import {useModuleSearch, useRefetchModuleSearchQuery} from "utils/modules";
import Loader from "components/loader";
import Spinner from "components/spinner";
import {QueryParamsInterface} from "interfaces/query-params-interface";
import Pagination from "components/pagination";
import {ColumnInterface} from "interfaces/column-interface";
import {ModuleInterface} from "interfaces/module-interface";
import {Table} from "components/table";
import ErrorMessage from "../components/error-message";

const columns: ColumnInterface<ModuleInterface>[] = [
    {
        attribute: "name",
        headerProps: {style: {width: "85%"}},
        contentProps: {className: "text-break"},
        content: (project: ModuleInterface) => {
            return (
                <>
                    <h5>
                        {project.repository_url ?
                            <a href={project.repository_url}
                               className="text-decoration-none"
                               rel="noreferrer"
                               target="_blank">{project.name}</a> : project.name}
                    </h5>
                    {
                        project.homepage ?
                            <small>
                                <FaHome aria-label="home url" className="me-1"/>
                                <a href={project.homepage}
                                   className="text-decoration-none"
                                   rel="noreferrer"
                                   target="_blank">{project.homepage}</a>
                            </small> : ""
                    }
                    <p>{project.description}</p>
                </>
            );
        }
    },
    {
        attribute: "stars",
        headerProps: {className: "text-nowrap"},
        sortable: true,
        contentProps: {className: "text-nowrap"}
    }
];

function Modules(): ReactElement {
    const [params, setParams] = React.useState<QueryParamsInterface>({page: 1, per_page: 5});
    const [queried, setQueried] = React.useState(false);
    const {modules, error, isLoading, isError, isSuccess} = useModuleSearch(params);
    const refetchProjectSearchQuery = useRefetchModuleSearchQuery(params);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        return () => refetchProjectSearchQuery();
    }, [refetchProjectSearchQuery]);

    function handleSearchClick(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (!isLoading && inputRef.current) {
            setQueried(true);
            setParams({...params, q: inputRef.current.value, page: 1});
        }
    }

    const onSort = React.useCallback((sort: string) => {
        setParams({...params, sort: (sort === params.sort ? null : sort)});
    }, [params, setParams]);


    return (
        <div className="container">
            <form onSubmit={handleSearchClick}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search projects..."
                           id="search"
                           ref={inputRef}
                           aria-label="Search projects" aria-describedby="basic-addon2"/>
                    <button className="input-group-text" id="basic-addon2" disabled={isLoading}>{isLoading ? (
                        <Spinner/>
                    ) : isError ? (
                        <FaTimes aria-label="error" className="text-danger"/>
                    ) : (
                        <FaSearch aria-label="search"/>
                    )}︎
                    </button>
                </div>
            </form>
            <div className="container">
                {isError ? (
                    <ErrorMessage error={error?.error || error?.message || null}/>
                ) : null}
                {queried ? null : (
                    isLoading ? (
                        <div className="text-center" style={{fontSize: "2em"}}>
                            <Spinner/>
                        </div>
                    ) : isSuccess && !modules.length ? (
                        <p>
                            Hmmm... I couldn't find any modules to suggest for you. Sorry.
                        </p>
                    ) : null
                )}
                {
                    modules.length ? (
                        <>
                            <Table<ModuleInterface> records={modules} columns={columns} sort={params.sort}
                                                    onSort={onSort}/>
                            {
                                !isLoading ?
                                    <div className="d-flex justify-content-center">
                                        <Pagination page={params.page || 1} total={modules.length}
                                                    limit={params.per_page || 0}
                                                    onPageChange={(page: number) => setParams({...params, page})}/>
                                    </div> : null
                            }
                        </>
                    ) : queried ? (
                        isLoading ? (
                            <div className="text-center">
                                <Loader/>
                            </div>
                        ) : (
                            <p>
                                No modules found!
                            </p>
                        )
                    ) : null
                }

            </div>
        </div>
    );
}

export default Modules;