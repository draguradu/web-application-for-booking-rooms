import React, { useState } from 'react';

const GlobalStateContext = React.createContext();

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))
};

function GlobalStateProvider(props) {
    const [globalState, setGlobalState] = useState(initialState);

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {props.children}
        </GlobalStateContext.Provider>
    );
}

function useGlobalStateContext() {
    const globalStateContext = React.useContext(GlobalStateContext);
    if (!globalStateContext) {
        throw new Error('useGlobalStateContext must be used within a GlobalStateContext');
    }
    return globalStateContext;
}

export { GlobalStateProvider, useGlobalStateContext };
