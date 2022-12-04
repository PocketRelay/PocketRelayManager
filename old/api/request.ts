export type Token = string | null;
export type BaseUrl = string;
export type RouteMethod = "GET"
    | "POST"
    | "PUT"
    | "DELETE";



export function request<V>(method: RouteMethod, base_url: string, route: string, body: any = null, token: Token = null):  Promise<V> {
    const init: RequestInit = {method};
    const headers: Record<string, string> = {};
    if (token != null) {
        headers["X-Token"] = token;
    }
    if (method !== "GET" && body !== null) {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(body);
    }
    init.headers = headers;

    return new Promise((resolve, reject) => {
        fetch(`${base_url}/${route}`, init)
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
    })
}