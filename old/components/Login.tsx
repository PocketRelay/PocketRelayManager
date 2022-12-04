import { useAccess } from "./AccessProvider";

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

export default function Login() {
    const {setToken, setBaseUrl} = useAccess()
    const [state, setState] = useState<AuthState>({
        state: State.INITIAL,
        username: "",
        password: "",
        error: ""
    })


    return <div>

    </div>


}