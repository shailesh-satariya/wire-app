import React, {Dispatch, ProviderProps, SetStateAction} from "react";

const ShowNavContext = React.createContext<[boolean, Dispatch<SetStateAction<boolean>>] | undefined>(undefined);

function ShowNavProvider(props: Partial<ProviderProps<any>>) {
    const [showNav, setShowNav] = React.useState(false);

    const value = React.useMemo(() => [showNav, setShowNav], [showNav, setShowNav]);

    return <ShowNavContext.Provider value={value} {...props}/>;
}

function useShowNavContext(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const context = React.useContext(ShowNavContext);
    if (context === undefined) {
        throw new Error("useTableContext must be within TableProvider");
    }

    return context;
}

export {ShowNavProvider, useShowNavContext};