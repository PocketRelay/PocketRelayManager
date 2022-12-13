import { ChangeEvent, FormEvent, useState } from "react";
import { TokenRequest, TokenResponse, TokenValidateResponse } from "@api/models";
import { getToken, validateToken } from "@api/routes";
import { BASE_URL_KEY, TOKEN_KEY, useAppContext } from "@contexts/AppContext"
import { useMutateWithInitial } from "@hooks/init";
import Loader from "@components/Loader";

/**
 * Component for handling authentication using the credentials
 * provided by the user and the baseURL provided in the previous step
 */
export default function Login() {
    const { setToken, setServerState, serverState } = useAppContext();

    // State for the user credentials
    const [credentials, setCredentials] = useState<TokenRequest>({
        username: "",
        password: ""
    });

    // Mutation for logging in
    const { isLoading, error, mutate } = useMutateWithInitial(tryLoginExisting, login);

    /**
     * Attempts to login to an existing token from local storage
     */
    async function tryLoginExisting(): Promise<void> {
        const token: string | null = localStorage.getItem(TOKEN_KEY);
        if (token == null) return;
        try {
            const response: TokenValidateResponse = await validateToken(
                serverState.baseURL,
                token
            );
            if (response.valid) {
                setToken(token);
                return;
            }
        } catch (e) { }
        localStorage.removeItem(TOKEN_KEY);
    }

    /**
     * Attempts to login to the server using the provided
     * credentials. Storing the token provided if the 
     * login attempt was successful
     */
    async function login(): Promise<void> {
        let details: TokenResponse = await getToken(
            serverState.baseURL,
            credentials,
        );
        localStorage.setItem(TOKEN_KEY, details.token);
        setToken(details.token);
    }

    // Display loading screen if loading 
    if (isLoading) {
        return <Loader />
    }

    /**
     * Clears the current server state returning the
     * user back to the Initialize screen
     */
    function clearServerState() {
        localStorage.removeItem(BASE_URL_KEY);
        setServerState(null!);
    }

    /**
     * Handles the change events for the username
     * and password fields and updates the credentials
     * state accordingly
     * 
     * @param event The change event
     */
    function onChangeEvent(event: ChangeEvent<HTMLInputElement>) {
        const element: HTMLInputElement = event.target;
        const name: string = element.name;
        setCredentials(state => ({
            ...state,
            [name]: element.value,
        }));
    }

    /**
     * Retrieves the text representation for the provided
     * HTTP status code error
     * 
     * @param error 
     */
    function getErrorText(error: number): string {
        if (error == 401) {
            return "Invalid Username or Password"
        } else {
            return "Unknown Error"
        }
    }

    /**
     * Handles submission of the form preventing
     * the default event and triggering the mutation
     * 
     * @param event 
     */
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        mutate();
    }

    return (
        <div className="modal-wrapper">
            <form className="modal" onSubmit={submit}>
                <button type="button" onClick={clearServerState} className="button">Clear Server</button>
                <h1 className="modal__title">Login</h1>
                <p className="modal__text">
                    Version: v{serverState.version}
                </p>
                <p className="modal__text">
                    Host: {serverState.baseURL}
                </p>

                {error && (
                    <p className="error">
                        {getErrorText(error[0])}
                    </p>
                )}
                <div className="list__contents list__contents--gap">

                    <label className="input">
                        <span className="input__name">Username</span>
                        <input
                            className="input__value"
                            type="text"
                            value={credentials.username}
                            onChange={onChangeEvent}
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
                            value={credentials.password}
                            onChange={onChangeEvent}
                            alt="Password"
                            placeholder=""
                            name="password"
                        />
                    </label>

                    <button
                        type="submit"
                        className="button button--fill"
                        disabled={credentials.username.length < 1 || credentials.password.length < 1}>
                        Login
                    </button>
                </div>
            </form>
        </div >

    )
}