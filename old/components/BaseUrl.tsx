enum State {
    INITIAL,
    LOADING,
    ERROR,
}

interface AuthState {
    state: State;
    username: string;
    password: string;
    error: string;
}

export default function BaseUrl() {
    return <div>

    </div>
}