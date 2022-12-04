import { createContext, FunctionComponent, PropsWithChildren, ReactNode, useState } from "react";

export type BaseURL = string | null;
export type Token = string | null;

interface AppContext {
    // The base url of the connected Pocket Relay server
    baseURL: BaseURL;
    // The token to authenticate with the API. Token is null until 
    // the initial login is complete
    token: Token;

}

const contextValue = createContext(null!);


export default function ContextProvider({ children }: { children: ReactNode }) {

    const [tokenState, setTokenState] = useState(null);
    const [baseURLState, setBaseUrlState] = useState(null);

}