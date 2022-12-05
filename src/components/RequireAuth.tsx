import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function RequireAuth({ children }: {children: JSX.Element }): JSX.Element {
    let { token, serverState } = useAppContext();

    if (!serverState) {
        return <Navigate to="/init"/>
    }

    if (!token) {
        return <Navigate to="/login"/>
    }

    return children;
}