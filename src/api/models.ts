// Structure of the server details response from the Pocket Relay server
// this response includes the version and other server details
export interface ServerDetails {
    version: string;
    services: Service[]
}

// The different types of services
export type ServiceType = "HTTP" | "Blaze" | "BlazeSecure" | "DirectBuffer"

// Structure of a service present in the server details response
export interface Service {
    // The name of the service
    name: string;
    // The port the service is running on
    port: number;
    // The type of service
    type: ServiceType;
}

// Structure of a response for a succesfull authentication attempt
export interface TokenResponse {
    // The authentication token
    token: string;
    // Unix timestamp of when the token expires
    expiry_time: number;
}

// Structure of a response for validating a token
export interface TokenValidateResponse {
    // Whether the token is valid
    valid: boolean;
    // The expiry time if the token is valid
    expiry_time: number | null;
}