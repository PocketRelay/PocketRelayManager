import { Context, createContext, FunctionComponent, PropsWithChildren, ReactNode, useContext, useState } from "react";
import { useAsync } from "react-use";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { ServerDetails } from "../api/models";
import { getServerDetails } from "../api/routes";

export type BaseURL = string | null;
export type Token = string | null;

export interface ServerState {
    /// The base url path to the Pocket Relay server 
    baseURL: string;
    /// The verson of the Pocket Relay server
    version: string;
}

export interface AppContext {
    // Information about the connected server or null if not
    // yet connected to a server
    serverState: ServerState | null,

    // The token to authenticate with the API. Token is null until 
    // the initial login is complete
    token: Token;

    setServerState(baseURL: string, version: string): void;
    clearServerState(): void;

    setToken(token: Token): void;
}

// The content store for storing the app context
const AppContext: Context<AppContext> = createContext<AppContext>(null!);

// Local storage key for the BaseURL 
const BASE_URL_KEY: string = "pocket_relay_url";
// Local storage key for the token
const TOKEN_KEY: string = "pocket_relay_token";

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

    const [tokenState, setTokenState] = useState<Token>(null);
    const [serverState, setServerStateImpl] = useState<ServerState | null>(null);

    useEffectOnce(() => { loadServerState().then().catch() });

    
    /**
     * Sets the current server state from the provided baseURL
     * and version and stores the baseURL in the local storage
     * 
     * @param baseURL The baseURL
     * @param version The server version
     */
    function setServerState(baseURL: string, version: string) {
        // Store the state
        localStorage.setItem(BASE_URL_KEY, baseURL);
        // Update the state
        setServerStateImpl({
            baseURL,
            version
        });
    }

    /**
     * Function for loading the server state from the local storage. This
     * first obtains the BaseURL from the local storage and then connects
     * to that server in order
     * 
     * @returns The server state if or null if it was unable to be loaded
     */
    async function loadServerState(): Promise<void> {
        const baseURL: string | null = localStorage.getItem(BASE_URL_KEY);
        if (baseURL == null) {
            return;
        }
        try {
            const details: ServerDetails = await getServerDetails(baseURL);
            const serverState: ServerState = {
                baseURL,
                version: details.version
            }
            setServerStateImpl(serverState)
        } catch (e) {
            // Error handling remove the saved state
            clearServerState();
        }
    }

    /**
     * Clears the current server state and removes the persisted url
     * from local storage
     */
    function clearServerState(): void {
        localStorage.removeItem(BASE_URL_KEY);
        setServerStateImpl(null);
    }

    /**
     * Updates the currently stored token value
     * 
     * @param token The token or null to clear
     */
    function setToken(token: Token) {
        if (token == null) {
            localStorage.removeItem(TOKEN_KEY);
        } else {
            localStorage.setItem(TOKEN_KEY, token);
        }
        setTokenState(token);
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