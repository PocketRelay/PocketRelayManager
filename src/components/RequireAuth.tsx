import { Navigate } from "react-router-dom";
import { useAppContext } from "@contexts/AppContext";
import { PropsWithChildren } from "react";

/**
 * Component for requiring authentication before displaying a specific
 * component. If the server state has not been initialized the user will
 * be navigated to /init and if the token has not be set to /login
 * 
 * @param children The child element to render if authenticated
 */
export default function RequireAuth({ children }: PropsWithChildren) {
    let { token, serverState } = useAppContext();

    // Display the initialize screen if theres no server state
    if (!serverState) {
        return <Navigate to="/init" />
    }

    // Display the login screen if theres no token
    if (!token) {
        return <Navigate to="/login" />
    }

    return children;
}