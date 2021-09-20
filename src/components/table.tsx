import React, {ProviderProps} from "react";
import {FaSortUp} from "react-icons/fa";
import {ColumnInterface} from "../interfaces/column-interface";
import {capitalizeFirstLetter, getRecordId} from "../utils/generic";
import ClickLink from "./click-link";

interface TableProps<T> {
    records: T[];
    columns: ColumnInterface<T>[];
    sort?: string | undefined | null;
    onSort?: (sort: string) => void;
};

interface TableContextProps<T> extends Partial<ProviderProps<any>> {
    value: TableProps<T>;
}

const TableContext = React.createContext<TableProps<any> | undefined>(undefined);

function TableProvider<T>({value, ...rest}: TableContextProps<T>) {
    return <TableContext.Provider value={value} {...rest}/>;
}

function useTableContext<T>(): TableProps<T> {
    const context = React.useContext(TableContext);
    if (context === undefined) {
        throw new Error("useTableContext must be within TableProvider");
    }

    return context;
}


function TableHeadCell<T>({column}: { column: ColumnInterface<T> }) {
    const {sort, onSort} = useTableContext<T>();
    const {attribute, label} = column;
    const headLabel = label ? label : capitalizeFirstLetter(attribute);
    const props = column.headerProps || {};

    return (
        <th {...props}>
            {column.sortable && onSort ?
                // eslint-disable-next-line react/jsx-no-undef
                <ClickLink onClick={() => onSort(attribute)} className="text-decoration-none">
                    {headLabel}{(sort === attribute ? <FaSortUp aria-label="sorted"/> : null)}
                </ClickLink> : headLabel
            }
        </th>
    );
}

function TableHead<T>() {
    const {columns} = useTableContext<T>();
    return (
        <thead>
        <tr>
            {
                columns.map((column) => (
                    <TableHeadCell key={column.attribute} column={column}/>
                ))
            }
        </tr>
        </thead>
    );
}

function TableBodyCell<T>({record, column, rowIndex}: { record: T, column: ColumnInterface<T>, rowIndex: number }) {
    const {attribute, content, contentProps} = column;
    const props = contentProps ? (typeof contentProps === "function" ? contentProps(record, rowIndex) : contentProps) : {};

    return (
        <td {...props}>
            {typeof content === "function" ? content(record, rowIndex) :
                (attribute in record ? (record as any)[attribute].toString() : "")}
        </td>
    );
}

function TableRow<T>({record, rowIndex}: { record: T, rowIndex: number }) {
    const {columns} = useTableContext<T>();
    return (
        <tr>
            {
                columns.map((column) => (
                    <TableBodyCell key={column.attribute} record={record} column={column} rowIndex={rowIndex}/>
                ))
            }
        </tr>
    );
}

function TableBody<T = any>() {
    const {records} = useTableContext<T>();
    return (
        <tbody>
        {
            records.map((record, index) => (
                <TableRow key={getRecordId(record)} record={record} rowIndex={index}/>
            ))
        }
        </tbody>
    );
}

function Table<T>(props: TableProps<T>) {
    return (
        <TableProvider<T> value={props}>
            <table className="table">
                <TableHead/>
                <TableBody<T>/>
            </table>
        </TableProvider>
    );
}

export {Table, TableRow, TableBody, TableHead};
