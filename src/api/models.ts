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