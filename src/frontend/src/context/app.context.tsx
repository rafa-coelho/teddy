import { createContext, ReactNode, useContext, useReducer } from 'react';

export interface AppState {
    userName?: string;
}

const initialState: AppState = {
    userName: undefined,
};


export type AppAction = { type: 'SET_USER_NAME', payload: string };

function appReducer (state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_USER_NAME':
            return { ...state, userName: action.payload };
        default:
            return state;
    }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction>; }>({
    state: initialState,
    dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const location = window.location.pathname;
    
    if (!["/", "/home"].includes(location)) {
        if(state.userName == undefined){
            window.location.href = "/home";
        }
    }

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
