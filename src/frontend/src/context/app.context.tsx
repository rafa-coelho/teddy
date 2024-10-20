import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';

export interface AppState {
    userName?: string;
}

const initialState: AppState = {
    userName: localStorage.getItem('userName') || undefined,
};

export type AppAction = { type: 'SET_USER_NAME', payload: string };

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_USER_NAME':
            localStorage.setItem('userName', action.payload);
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

    useEffect(() => {
        if (!["/", "/home"].includes(location)) {
            if (state.userName === undefined) {
                window.location.href = "/home";
            }
        }
    }, [location, state.userName]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
