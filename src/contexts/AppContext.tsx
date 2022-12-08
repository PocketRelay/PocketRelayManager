import { Context, createContext, ReactNode, useContext, useState } from "react";
import { TokenValidateResponse } from "../api/models";
import { validateToken } from "../api/routes";

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
    clearServerState(): void;
    setToken(token: string | null): void;
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

    const [tokenState, setTokenState] = useState<string>(null!);
    const [serverState, setServerState] = useState<ServerState>(null!);


    /**
     * Checks the token stored in the local storage to see if its
     * valid and if it is then it is set as the token otherwise its
     * removed from local storage
     * 
     * @param baseURL The server baseURL
     * @returns 
     */
    async function checkStoredToken(baseURL: string): Promise<void> {
        const token: string | null = localStorage.getItem(TOKEN_KEY);
        if (token == null) {
            return;
        }
        try {
            const response: TokenValidateResponse = await validateToken(baseURL, token);
            if (response.valid) {
                setTokenState(token);
                return;
            } else {
            }
        } catch (_) { }
        setToken(null);
    }

    /**
     * Clears the current server state and removes the persisted url
     * from local storage
     */
    function clearServerState(): void {
        localStorage.removeItem(BASE_URL_KEY);
        setServerState(null!);
    }

    /**
     * Updates the currently stored token value
     * 
     * @param token The token or null to clear
     */
    function setToken(token: string | null) {
        if (token == null) {
            localStorage.removeItem(TOKEN_KEY);
        } else {
            localStorage.setItem(TOKEN_KEY, token);
        }
        setTokenState(token!);
    }

    const contextValue: AppContext = {
        serverState,
        token: tokenState,
        setServerState,
        clearServerState,
        setToken
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}