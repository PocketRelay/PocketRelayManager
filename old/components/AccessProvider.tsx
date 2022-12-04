import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";
import { request, RouteMethod, Token } from "../api/request";
import { useEffectAsync } from "../utils";

/// The local storage key to use for storing the token
const LOCAL_STORAGE_KEY: string = "pocket_relay_token";

interface AccessContextType {
    baseUrl: string | null,
    token: Token,
    setToken: (token: Token) => void,
    setBaseUrl: (value: string | null) => void,
    request: <V>(method: RouteMethod, route: string, body?: any) => Promise<V>,
    logout: () => void;
}

const AccessContext = createContext<AccessContextType>(null!);
export const useAccess = (): AccessContextType => useContext(AccessContext);

/**
 * Provided for providing the access context to elements
 * further down in the tree. The access provider handles
 * storage of the access token which can be used to
 * sent out requests
 *
 * @param children Children for this element
 * @constructor Creates a new access provider
 */
export const AccessProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [tokenState, setTokenState] = useState<Token>(null);
    const [baseUrl, setBaseUrlState] = useState<string | null>(null);

    // Check token validity on initial load
    useEffectAsync(isValidToken);

    function setBaseUrl(value: string |  null) {
        setBaseUrlState(value);
    }


    /**
     * Validates the token loaded from local storage by retrieving its
     * status from the backend API
     */
    async function isValidToken() {
        const token: Token = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (token == null) return;
        // Make a GET request to /api/auth with the token from local storage
        return
    }

    /**
     * Makes the current authentication token invalid on the
     * server and then clears the token client side.
     */
    async function logout() {
        // Make a DELETE request to /api/auth with the token set to delete it
        return false;
    }

    /**
     * Wrapper over the set token state to add or remove
     * the token from local storage based on whether the
     * token value is null
     *
     * @param token The token or null to clear
     */
    function setToken(token: Token) {
        setTokenState(token)
        if (token != null) localStorage.setItem(LOCAL_STORAGE_KEY, token)
        else localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    /**
     * Wrapper function which wraps the token into the request
     *
     * @param method The request method
     * @param path The request path
     * @param body The optional request body
     */
    function wrapRequest<V>(
        method: RouteMethod,
        path: string,
        body: any = null
    ): Promise<V> {
        return request<V>(method, path, body, tokenState)
            .catch(error => {
                // Handle not authenticated errors
                if (error === 401) setToken(null)
                return error;
            });
    }

    // Context state to provide to children
    const contextValue: AccessContextType = {
        baseUrl,
        token: tokenState,
        setToken,
        setBaseUrl,
        request: wrapRequest,
        logout
    };
    return <AccessContext.Provider value={contextValue}>{children}</AccessContext.Provider>;
}