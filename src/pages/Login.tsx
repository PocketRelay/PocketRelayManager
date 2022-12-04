import { ServerState, useAppContext } from "../contexts/AppContext"

interface Properties {
    serverState: ServerState,
}

export default function Login({ serverState }: Properties) {
    const {setToken, clearServerState} = useAppContext();

    return <div>
        <button onClick={clearServerState}>Clear Server</button>
        <h1>Login</h1>
        <p>
        v{serverState.version}
        </p>
        <div>
            <input type="text" />
            <input type="text" />
        </div>
    </div>
}