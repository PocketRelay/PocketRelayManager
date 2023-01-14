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

export interface GetPlayersResponse {
    players: Player[];
    more: boolean;
}

export interface PlayerUpdate {
    email?: string;
    display_name?: string;
    origin?: boolean;
    password?: string;
}


export interface GamesResponse {
    games: Game[];
    more: boolean;
}

export interface Game {
    id: number;
    state: string;
    setting: number;
    attributes: Record<string, string>;
    players: GamePlayer[];
}

export interface GamePlayer {
    session_id: number;
    player_id: number;
    display_name: string;
    net: GamePlayerNet;
}

export interface GamePlayerNet {
    groups: NetGroups,
    qos: QosNetworkData;
    hardware_flags: number;
    is_set: boolean;
}

export type NattType = "Open" | "Moderate" | "Sequential" | "Strict" | string;

export interface QosNetworkData {
    dbps: number;
    natt: NattType;
    ubps: number;
}

export interface NetGroups {
    internal: NetGroup;
    external: NetGroup;
}

export interface NetGroup {
    address: string;
    port: number;
}

export interface PlayerData {
    value: string | null;
}

export type PlayerDataList = Record<"Base" | string, string>;