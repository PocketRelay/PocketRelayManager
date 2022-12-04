import { AppContext, Token } from "../contexts/AppContext";
import { ServerDetails } from "./models";

// Http request method types
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Structure of errors from make request [statusCode, text]
export type RequestError = [number, string];

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
async function makeRequest<T>(method: HttpMethod, baseURL: string, url: string, token: Token = null, body: any | null = null): Promise<T> {
    const init: RequestInit = { method };
    const headers: Record<string, string> = {};

    if (token != null) {
        headers["X-Token"] = token;
    }

    if (method != "GET" && body !== null) {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(body);
    }

    init.headers = headers;

    return new Promise((resolve, reject) => {
        fetch(`${baseURL}/${url}`, init)
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

export async function getServerDetails(baseURL: string): Promise<ServerDetails> {
    let response = await makeRequest<ServerDetails>("GET", baseURL, "api/server");
    return response;
}

