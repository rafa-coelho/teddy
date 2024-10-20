import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface AppState {
    userName?: string;
    isMocked?: boolean;
}

const initialState: AppState = {
    userName: localStorage.getItem('userName') || undefined,
    isMocked: import.meta.env.VITE_APP_IS_MOCKED === 'true' || false,
};

export type AppAction = { type: 'SET_USER_NAME', payload: string | undefined };

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_USER_NAME':
            if(action.payload === undefined) {
                localStorage.removeItem('userName');
                return { ...state, userName: action.payload };
            }

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
    const location = useLocation();

    useEffect(() => {
        if (!["/", "/home"].includes(location.pathname)) {
            if (state.userName === undefined) {
                window.location.href = "/home";
            }
        }

        if(location.pathname === "/logout") {
            dispatch({ type: 'SET_USER_NAME', payload: undefined });
            window.location.href = "/home";
        }
    }, [location, state.userName]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line
export const useAppContext = () => useContext(AppContext);
