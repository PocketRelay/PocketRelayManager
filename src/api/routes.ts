import { AppContext } from "@contexts/AppContext";
import { GetPlayersResponse, Player, PlayerClass, PlayerUpdate, ServerDetails, TokenRequest, TokenResponse, TokenValidateResponse } from "./models";

// Http request method types
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Structure of errors from make request [statusCode, text]
export type RequestError = [number, string];

export interface RequestConfig {
    method: HttpMethod,
    baseURL: string,
    url: string,
    token?: string,
    body?: any
}

/**
 * Makes a request with the proivded details
 * 
 * @param method The HTTP method to use for the request
 * @param baseURL THe base portion of the URL
 * @param url The route portion of the URL
 * @param token The optional token to use for authentication
 * @param body The optional body to use 
 * @returns A promise for the provided type or an error
 */
async function makeRequest<T>(config: RequestConfig): Promise<T> {
    const init: RequestInit = { method: config.method };
    const headers: Record<string, string> = {};

    if (config.token) {
        headers["X-Token"] = config.token;
    }

    if (config.method != "GET" && config.body) {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(config.body);
    }

    init.headers = headers;

    return new Promise((resolve, reject) => {
        fetch(`${config.baseURL}/${config.url}`, init)
            .then(response => {
                if (Math.floor(response.status / 100) === 2) {
                    response.json()
                        .then(resolve)
                        .catch(_ => reject([response.status, "Invalid JSON response"]));
                } else {
                    response.text()
                        .then(text => reject([response.status, text]))
                        .catch(_ => reject([response.status, "Unknown error"]));
                }
            })
            .catch(_ => reject([-1, "Failed to connect"]));
    });
}


export interface SafeRequestConfig {
    method: HttpMethod,
    url: string,
    body?: any
}

/**
 * Request wrapping function for requests that are using the
 * app context which contains a token and baseURL. Ensures
 * that if the request return 401 Unauthorized to clear 
 * the token and prompt for authentication again
 * 
 * @param config 
 * @param context 
 * @returns 
 */
async function makeRequestSafe<T>(config: SafeRequestConfig, context: AppContext): Promise<T> {
    try {
        return await makeRequest({
            ...config,
            token: context.token,
            baseURL: context.serverState.baseURL,
        });
    } catch (e) {
        const error: RequestError = e as RequestError;
        if (error[0] == 401) {
            // Authentication failed
            context.setToken(null!);
        }
        throw error;
    }
}

/**
 * Obtains the server details of the server at the provided baseURL
 * using the api/server endpoint
 * 
 * @param baseURL The server baseURL 
 * @returns Promise for the server details
 */
export function getServerDetails(baseURL: string): Promise<ServerDetails> {
    return makeRequest({
        method: "GET",
        baseURL,
        url: "api/server"
    });
}

/**
 * Attempts to obtain token authentication using the provided username 
 * and password at the server with the proivded baseURL
 * 
 * @param baseURL The server baseURL
 * @param username The username to authenticate with
 * @param password The password to authenticate with 
 * @returns The token response
 */
export function getToken(baseURL: string, request: TokenRequest): Promise<TokenResponse> {
    return makeRequest({
        method: "POST",
        baseURL,
        url: "api/token",
        body: request
    });
}

/**
 * Checks with the server to see whether the provided token is
 * a valid token.
 * 
 * @param baseURL The server baseURL 
 * @param token The token to check
 * @returns The token validation response
 */
export function validateToken(baseURL: string, token: string): Promise<TokenValidateResponse> {
    return makeRequest({
        method: "GET",
        baseURL,
        url: `api/token?token=${token}`
    });
}

export function getPlayers(context: AppContext, offset: number, count: number): Promise<GetPlayersResponse> {
    return makeRequestSafe({
        method: "GET",
        url: `api/players?offset=${offset}&count=${count}`
    }, context);
}

export function getPlayer(context: AppContext, id: string): Promise<Player> {
    return makeRequestSafe({
        method: "GET",
        url: `api/players/${id}`
    }, context);
}

export function updatePlayer(context: AppContext, id: number, update: PlayerUpdate): Promise<Player> {
    return makeRequestSafe({
        method: "PUT",
        url: `api/players/${id}`,
        body: update,
    }, context);
}

export function getPlayerClasses(context: AppContext, player: Player): Promise<PlayerClass[]> {
    return makeRequestSafe({
        method: "GET",
        url: `api/players/${player.id}/classes`,
    }, context);
}

export function updatePlayerClass(context: AppContext, player: Player, index: number, level: number, promotions: number): Promise<PlayerClass> {
    return makeRequestSafe({
        method: "PUT",
        url: `api/players/${player.id}/classes/${index}`,
        body: {
            level,
            promotions
        }
    }, context);
}