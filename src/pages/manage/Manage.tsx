import { Route, Routes } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import Games from "./Games";
import Home from "./Home";
import Player from "./player/Player";
import Players from "./Players";

export default function Manage() {

    const { setToken } = useAppContext();

    function logout(): void {
        setToken(null);
    }

    return (
        <div className="manage">
            <button onClick={logout}>Logout</button>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/players" element={<Players/>}/>
                <Route path="/players/:id" element={<Player/>}/>
                <Route path="/games" element={<Games/>}/>
            </Routes>
        </div>
    )
}