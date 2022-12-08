import { Context, createContext, ReactNode, useContext, useState } from "react";

export interface ServerState {
    /// The base url path to the Pocket Relay server 
    baseURL: string;
    /// The verson of the Pocket Relay server
    version: string;
}

export interface AppContext {
    // Information about the connected server or null if not
    // yet connected to a server
    serverState: ServerState,
    // The token to authenticate with the API. Token is null until 
    // the initial login is complete
    token: string;
    setServerState(serverState: ServerState): void;
    setToken(token: string): void;
}

// The content store for storing the app context
const AppContext: Context<AppContext> = createContext<AppContext>(null!);

// Local storage key for the BaseURL 
export const BASE_URL_KEY: string = "pocket_relay_url";
// Local storage key for the token
export const TOKEN_KEY: string = "pocket_relay_token";

export function useAppContext(): AppContext {
    return useContext(AppContext);
}

/**
 * Provider wrapper for the AppContext which initiailizes the initial 
 * content value state.
 * 
 * 
 * @param children The child element to render within the provided
 */
export function AppContextProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string>(null!);
    const [serverState, setServerState] = useState<ServerState>(null!);

    const contextValue: AppContext = {
        serverState,
        token,
        setServerState,
        setToken
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}