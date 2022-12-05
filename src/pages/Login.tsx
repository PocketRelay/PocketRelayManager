import { ChangeEvent, useState } from "react";
import { TokenResponse } from "../api/models";
import { getToken, RequestError } from "../api/routes";
import { ServerState, useAppContext } from "../contexts/AppContext"

interface Properties {
    serverState: ServerState,
}

enum State {
    INITIAL,
    CONNECTING,
    ERROR,
}

interface LoginState {
    username: string;
    password: string;
    error: string;
    state: State;
}

export default function Login({ serverState }: Properties) {
    const { setToken, clearServerState } = useAppContext();
    const [state, setState] = useState<LoginState>({
        username: "",
        password: "",
        error: "",
        state: State.INITIAL,
    });

    function onValueChange(event: ChangeEvent<HTMLInputElement>) {
        const element: HTMLInputElement = event.target;
        const name: string = element.name;
        setState(state => ({
            ...state,
            [name]: element.value
        }));
    }

    async function tryLogin() {
        setState(state => ({
            ...state,
            state: State.CONNECTING,
        }));
        try {
            let details: TokenResponse = await getToken(serverState.baseURL, state.username, state.password);
            console.table(details);
            setToken(details.token);
        } catch (e) {
            const err: RequestError = e as RequestError;
            console.log(err);
            setState(state => ({
                ...state,
                error: "Unable to connect or server url was not a Pocket Relay server",
                state: State.ERROR,
            }));
        }
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <button onClick={clearServerState} className="button">Clear Server</button>
                <h1 className="modal__title">Login</h1>
                <p className="modal__text">
                    Version: v{serverState.version}
                </p>
                <p className="modal__text">
                    Host: {serverState.baseURL}
                </p>
                <div>

                    <label className="input">
                        <span className="input__name">Username</span>
                        <input
                            className="input__value"
                            type="text"
                            value={state.username}
                            onChange={onValueChange}
                            alt="Username"
                            placeholder=""
                            name="username"
                        />
                    </label>


                    <label className="input">
                        <span className="input__name">Password</span>
                        <input
                            className="input__value"
                            type="password"
                            value={state.password}
                            onChange={onValueChange}
                            alt="Password"
                            placeholder=""
                            name="password"
                        />
                    </label>

                    <button className="button" onClick={tryLogin}>Login</button>
                </div>
            </div>
        </div>

    )
}