import { FormEvent, useState } from "react";
import { ServerDetails } from "@api/models";
import { getServerDetails } from "@api/routes";
import { BASE_URL_KEY, useAppContext } from "@contexts/AppContext";
import Loader from "@components/Loader";
import { useMutateWithInitial } from "@hooks/init";

/**
 * Component for handling setting up the initial state for the server
 * this involves taking the connection URL as user input and checking
 * whether it is a valid Pocket Relay server. 
 */
export default function Initialize() {
    const { setServerState } = useAppContext();
    // State for the baseURL field
    const [url, setURL] = useState("");
    // Mutation for connecting to the server
    const { isLoading, error, mutate } = useMutateWithInitial(tryConnectExisting, connect);

    /**
     * Attempts to connect to an existing server present in the
     * localStorage removing the local storage key if its invalid
     */
    async function tryConnectExisting(): Promise<void> {
        const baseURL: string | null = localStorage.getItem(BASE_URL_KEY);
        if (baseURL == null) return;
        try {
            const response: ServerDetails = await getServerDetails(baseURL);
            const version: string | undefined = response.version;
            if (version !== undefined) {
                setServerState({ baseURL, version });
                return;
            }
        } catch (e) { }
        localStorage.removeItem(BASE_URL_KEY);
    }

    /**
     * Function for connecting to the server checking that
     * the response is correct and if it is then the server
     * state is updated
     */
    async function connect(): Promise<void> {
        const baseURL: string = fixUrl(url);
        const response: ServerDetails = await getServerDetails(baseURL);
        const version: string | undefined = response.version;
        if (version !== undefined) {
            // Store the key and update the state
            localStorage.setItem(BASE_URL_KEY, baseURL);
            setServerState({ baseURL, version });
        } else {
            throw [400, "Response was missing a version field. It's unlikley that its a Pocket Relay server."]
        }
    }

    /**
     * Fixes the provided url string to ensure that it
     * starts with http:// and does not end with a slash
     * 
     * @param url The original url
     * @returns The url with slashes and the prefix fixed
     */
    function fixUrl(url: string): string {
        if (!url.startsWith("http://")) {
            url = "http://" + url;
        }
        if (url.startsWith("https://")) {
            url = url.replaceAll("https://", "http://");
        }
        if (url.endsWith("/")) {
            url = url.substring(0, url.length - 1);
        }
        return url;
    }

    // Display loading screen if loading 
    if (isLoading) {
        return <Loader />
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
                <h1 className="modal__title">Connect</h1>

                {error && (
                    <p className="error">
                        {error[1]}
                    </p>
                )}

                <label className="input">
                    <span className="input__name">Connection URL</span>
                    <input
                        className="input__value"
                        type="text"
                        value={url}
                        onChange={(event) => setURL(event.target.value)}
                        alt="Connection URL"
                        disabled={isLoading}
                        placeholder="e.g localhost"
                        name="url"
                    />
                </label>

                <p className="modal__text">
                    The connection url is the url to the see the documentation
                    <a href="https://github.com/PocketRelay/Client" target="_blank"> Here</a>
                </p>

                <button
                    type="submit"
                    className="button"
                    disabled={url.length < 1}>
                    Connect
                </button>

            </form>
        </div >
    )
}