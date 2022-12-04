import { ChangeEvent, useState } from "react";
import { ServerDetails } from "../api/models";
import { getServerDetails } from "../api/routes";
import { useAppContext } from "../contexts/AppContext";
import "./Initialize.scss";

enum State {
    INITIAL,
    CONNECTING,
    ERROR,
}

interface InitState {
    url: string;
    error: string;
    state: State,
}


/**
 * This component is the initialization component which takes in the
 * initial connection url for the Pocket Relay server 
 */
export default function Initialize() {

    const {setServerState} = useAppContext();
    const [state, setState] = useState<InitState>({
        url: "",
        error: "",
        state: State.INITIAL,
    });

    const inputDisabled = state.state == State.CONNECTING;
    const buttonDisbaled = state.url.length < 1;

    async function tryConnect() {
        setState(state => ({
            ...state,
            state: State.CONNECTING,
        }));
        let url = fixUrl(state.url);
        try {
            let details: ServerDetails = await getServerDetails(url);
            console.table(details);
            setServerState(url, details.version);
        } catch (e) {
            console.log(e);
            setState(state => ({
                url: state.url,
                error: "Unable to connect or server url was not a Pocket Relay server",
                state: State.ERROR,
            }));
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

    /**
     * Handles the value changes for the URL input 
     * in order to keep the state up to date
     * 
     * @param event The input changed event
     */
     function onValueChange(event: ChangeEvent<HTMLInputElement>) {
        const element: HTMLInputElement = event.target;
        const name: string = element.name;
        setState(state => ({
            ...state,
            [name]: element.value
        }));
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <h1 className="modal__title">Connect</h1>

                {(state.state == State.ERROR) && (
                    <p className="init__error">
                        {state.error}
                    </p>
                )}

                <label className="input">
                    <span className="input__name">Connection URL</span>
                    <input
                        className="input__value"
                        type="text"
                        value={state.url}
                        onChange={onValueChange}
                        alt="Connection URL"
                        disabled={inputDisabled}
                        placeholder="e.g localhost"
                        name="url"
                    />
                </label>

                <p className="modal__text">
                    The connection url is the url to the see the documentation
                    <a href="https://github.com/PocketRelay/Client" target="_blank"> Here</a>
                </p>

                <button className="button" onClick={tryConnect} disabled={buttonDisbaled}>
                    Connect
                </button>

            </div>
        </div>
    )
}