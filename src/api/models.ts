/*
    This file contains models that describe the structure of 
    certain data that can be requested from the Pocket Relay
    server
*/

// The expected value of "ident" from server details
export const EXPECTED_IDENT: string = "POCKET_RELAY_SERVER";

// Structure of the server details response from the Pocket Relay server
// this response includes the version and other server details
export interface ServerDetails {
    // Identifier field which MUST be present to consider the server to
    // be a Pocket relay server
    ident?: string;
    // The version of the server
    version?: string;
}

// Structure for a token request
export interface TokenRequest {
    // The authentication username
    username: string;
    // The authentication password
    password: string;
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

/// Structure of a player
export interface Player {
    id: number;
    email: string;
    display_name: string;
    origin: boolean;
}

// Structure of the response from querying players
export interface GetPlayersResponse {
    // The list of players from the query result
    players: Player[];
    // Whether there are more players at the next offset
    more: boolean;
}

// Structure for updating a player
export interface PlayerUpdate {
    // Optional email to update to
    email?: string;
    // Optional name to update to 
    display_name?: string;
    // Optional origin state to update to
    origin?: boolean;
    // Optional password to update to
    password?: string;
}

// Structure of a response from a games query
export interface GamesResponse {
    // The list of games 
    games: Game[];
    // Whether there are more games after the query
    more: boolean;
}

// Structure of a game on the server
export interface Game {
    // The ID of the game
    id: number;
    // The game state
    state: string;
    // The game setting
    setting: number;
    // Map of attributes 
    attributes: Record<string, string>;
    // The list of players in the game
    players: GamePlayer[];
}

// Structure of a player in a game
export interface GamePlayer {
    // The session ID of the player
    session_id: number;
    // The player id of the player
    player_id: number;
    // The display name of the player
    display_name: string;
    // The networking details of the player
    net: GamePlayerNet;
}

// Structure of player networking information
export interface GamePlayerNet {
    // The internal and external player networking groups
    groups: {
        internal: NetGroup;
        external: NetGroup;
    };
    // The quality of service networking data
    qos: {
        dbps: number;
        natt: NattType;
        ubps: number;
    };
    // The networking hardware flags
    hardware_flags: number;
    // Whether the networking data has actually been set
    is_set: boolean;
}

// The different possible NAT types
export type NattType = "Open" | "Moderate" | "Sequential" | "Strict" | string;

// Structure of a netwroking group
export interface NetGroup {
    address: string;
    port: number;
}

// Structure for a player data response where the content could be null
export interface PlayerData {
    value: string | null;
}

// Type for the list of player data
export type PlayerDataList = Record<"Base" | string, string>;