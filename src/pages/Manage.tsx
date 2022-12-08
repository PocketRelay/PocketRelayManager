import { Route, Routes } from "react-router-dom";
import { useAppContext } from "@contexts/AppContext";
import Games from "./manage/Games";
import Home from "./manage/Home";
import Player from "./manage/player/Player";
import Players from "./manage/Players";
import "./Manage.scss";

export default function Manage() {

    const { setToken } = useAppContext();

    function logout(): void {
        setToken(null);
    }

    return (
        <div className="manage">
            <button onClick={logout} className="logout button">Logout</button>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/players" element={<Players/>}/>
                <Route path="/players/:id/*" element={<Player/>}/>
                <Route path="/games" element={<Games/>}/>
            </Routes>
        </div>
    )
}