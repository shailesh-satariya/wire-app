export interface ColumnInterface<T> {
    attribute: string;
    label?: string;
    headerProps?: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
    contentProps?: (React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>)
        | ((record: T, index: number) => React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>);
    sortable?: boolean;
    content?: (record: T, index: number) => JSX.Element | React.Component | string | null;
}