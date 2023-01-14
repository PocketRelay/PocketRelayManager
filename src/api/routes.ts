import { AppContext } from "@contexts/AppContext";
import * as models from "./models";

// Http request method types
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Structure of errors from make request [statusCode, text]
type RequestError = [number, string];

// Structure for a configuration object to provide to the
// makeRequest function
interface RequestConfig {
    // The request HTTP method to use
    method: HttpMethod;
    // The base portion / prefix of the URL
    baseURL: string;
    // The route segment of the URL
    url: string;
    // Optional authentication token to use
    token?: string,
    // Optional body to encode as JSON
    body?: any
}

/**
 * Makes a request with the provided details
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

    // Apply the token if provided
    if (config.token) {
        headers["X-Token"] = config.token;
    }

    // Serialize JSON body if provided
    if (config.method != "GET" && config.body) {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(config.body);
    }

    init.headers = headers;

    let response: Response;
    // Handle initial fetch errors
    try {
        response = await fetch(`${config.baseURL}/${config.url}`, init);
    } catch (e) {
        throw [-1, "Failed to connect"];
    }

    if (Math.floor(response.status / 100) === 2) {
        try {
            return await response.json();
        } catch (e) {
            throw [response.status, "Invalid JSON response"];
        }
    } else {
        // Handle non 200 status codes by taking the text response
        try {
            const text: string = await response.text();
            throw [response.status, text];
        } catch (_) {
            throw [response.status, "Unknown error"];
        }
    }
}

// Request config type without the token and base url fields as these
// are filled in already using the app context
interface SafeRequestConfig {
    // The request HTTP method to use
    method: HttpMethod,
    // The route segment of the URL
    url: string,
    // Optional body to encode as JSON
    body?: any
}

/**
 * Request wrapping function for requests that are using the
 * app context which contains a token and baseURL. Ensures
 * that if the request return 401 Unauthorized to clear 
 * the token and prompt for authentication again
 * 
 * @param config  The request config
 * @param context The application context
 * @returns The promise to the response type struct
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
        console.log(e);
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
export function getServerDetails(baseURL: string): Promise<models.ServerDetails> {
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
export function getToken(baseURL: string, request: models.TokenRequest): Promise<models.TokenResponse> {
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
export function validateToken(baseURL: string, token: string): Promise<models.TokenValidateResponse> {
    return makeRequest({
        method: "GET",
        baseURL,
        url: `api/token?token=${token}`
    });
}

/**
 * Obtains the list of players the length of count at the provided page offset 
 * 
 * @param context The app context
 * @param offset  The page offset
 * @param count   The number of players to query
 * @returns       The players list response
 */
export function getPlayers(context: AppContext, offset: number, count: number): Promise<models.GetPlayersResponse> {
    return makeRequestSafe({
        method: "GET",
        url: `api/players?offset=${offset}&count=${count}`
    }, context);
}

/**
 * Obtains the details of a specific player using it player id
 * 
 * @param context The app context 
 * @param id      The id of the player to retrieve
 * @returns       The player data
 */
export function getPlayer(context: AppContext, id: string): Promise<models.Player> {
    return makeRequestSafe({
        method: "GET",
        url: `api/players/${id}`
    }, context);
}

/**
 * Updates the provided fields on the player with the provided ID
 * 
 * @param context The app context
 * @param id      The id of the player to retrieve
 * @param update  The fields to update
 * @returns       The updated player
 */
export function updatePlayer(context: AppContext, id: number, update: models.PlayerUpdate): Promise<models.Player> {
    return makeRequestSafe({
        method: "PUT",
        url: `api/players/${id}`,
        body: update,
    }, context);
}

/**
 * Gets the player data for the player that has the provided key
 * 
 * @param context The app context
 * @param id      The id of the player to retrieve
 * @param key     The key to get the value of
 * @returns       The player data value if present
 */
export function getPlayerData(context: AppContext, id: number, key: string): Promise<models.PlayerData> {
    return makeRequestSafe({
        method: "GET",
        url: `api/players/${id}/data/${key}`,
    }, context);
}

/**
 * Gets a list of all the player data for the player with the 
 * provided ID
 * 
 * @param context The app context
 * @param id      The id of the player to retrieve
 * @returns       The list of player data
 */
export function getPlayerDataList(context: AppContext, id: number): Promise<models.PlayerDataList> {
    return makeRequestSafe({
        method: "GET",
        url: `api/players/${id}/data`,
    }, context);
}

/**
 * Sets the key value pair of player data for the player with the
 * provided ID
 * 
 * @param context The app context
 * @param id      The id of the player to retrieve
 * @param key     The key of the player data to set
 * @param value   The value to set the data to
 * @returns       
 */
export function setPlayerData(context: AppContext, id: number, key: string, value: string): Promise<void> {
    return makeRequestSafe({
        method: "PUT",
        url: `api/players/${id}/data/${key}`,
        body: {
            value,
        }
    }, context);
}

/**
 * Obtains a list of running games on the server at the provided
 * offset
 * 
 * @param context The app context
 * @param offset  The page offset
 * @param count   The number of games to obtain
 * @returns       The list of games
 */
export function getGames(context: AppContext, offset: number, count: number): Promise<models.GamesResponse> {
    return makeRequestSafe({
        method: "GET",
        url: `api/games?offset=${offset}&count=${count}`,
    }, context);
}