import { Context, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { ServerDetails, TokenValidateResponse } from "../api/models";
import { getServerDetails, validateToken } from "../api/routes";

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

    // The initial loading state for checking stored tokens and
    // stored baseURL
    loading: boolean,

    setServerState(baseURL: string, version: string): void;
    clearServerState(): void;
    setToken(token: string | null): void;
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

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tokenState, setTokenState] = useState<string>(null!);
    const [serverState, setServerStateImpl] = useState<ServerState>(null!);

    useEffectOnce(() => { loadServerState().then().catch() });

    useEffect(() => {
        if (serverState == null) {
            console.log("Tried to navigate to init")
            navigate("/init");
        } else if (tokenState == null) {
            navigate("/login");
        }
    }, [tokenState, serverState]);


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
        setLoading(true);
        const baseURL: string | null = localStorage.getItem(BASE_URL_KEY);
        if (baseURL == null) {
            setLoading(false);
            return;
        }
        try {
            // Attempt to validate the server baseURL
            const response: ServerDetails = await getServerDetails(baseURL);
            const serverState: ServerState = {
                baseURL,
                version: response.version
            }
            setServerStateImpl(serverState);

            // Attempt to validate any stored tokens
            await checkStoredToken(serverState.baseURL);
        } catch (e) {
            // Error handling remove the saved state
            clearServerState();
        }
        setLoading(false);
    }

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
        setServerStateImpl(null!);
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
        loading,
        setServerState,
        clearServerState,
        setToken
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}