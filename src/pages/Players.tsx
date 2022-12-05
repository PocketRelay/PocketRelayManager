import { stat } from "fs";
import { ReactNode, useState } from "react"
import { useAsyncRetry } from "react-use";
import { GetPlayersResponse } from "../api/models";
import { getPlayers } from "../api/routes";
import Loader from "../components/Loader";
import { useAppContext } from "../contexts/AppContext";

export default function Players() {
    const appContext = useAppContext();
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(10);

    const state = useAsyncRetry(async () => {
        return await getPlayers(appContext, offset, count);
    }, [offset, count, appContext])


    if (state.loading) {
        return <Loader />
    } else if (state.value) {
        let value: GetPlayersResponse = state.value;
        let prevDisabled: boolean = offset <= 0;
        let nextDisabled: boolean = !value.more;
        return (
            <div>
                <div>
                    <div>
                        <button className="button" disabled={prevDisabled}>Previous</button>
                        <label>
                            <span>Rows</span>
                            <select name="" id="">
                                <option value={5}>5</option>
                                <option value={10} selected>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </label>
                        <button className="button" disabled={nextDisabled}>Next</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Display Name</th>
                            <th>Email</th>
                            <th>Origin</th>
                            <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value.players.map((player, index) => (
                            <tr key={index}>
                                <td>{player.id}</td>
                                <td>{player.display_name}</td>
                                <td>{player.email}</td>
                                <td>{player.origin}</td>
                                <td>{player.credits}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Failed to load players</h1>
                <button className="button" onClick={state.retry}>Retry</button>
            </div>
        )
    }

}