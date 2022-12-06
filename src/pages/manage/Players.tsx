import { useState } from "react"
import { Link } from "react-router-dom";
import { useAsyncRetry } from "react-use";
import { GetPlayersResponse } from "../../api/models";
import { getPlayers } from "../../api/routes";
import Loader from "../../components/Loader";
import { useAppContext } from "../../contexts/AppContext";

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

        function nextPage() {
            setOffset(offset => offset + 1);
        }

        function prevPage() {
            setOffset(offset => offset == 0 ? 0 : offset - 1);
        }

        return (
            <div>
                <div>
                    <div>
                    <Link to="/" className="button">
                        Back
                    </Link>
                        <button className="button" disabled={prevDisabled} onClick={prevPage}>Previous</button>
                        <label>
                            <span>Rows</span>
                            <select name="" id="" defaultValue={10}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </label>
                        <button className="button" disabled={nextDisabled} onClick={nextPage}>Next</button>
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
                            <th>Edit</th>
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
                                <td>
                                    <Link to={"/players/" + player.id} > Edit
                                    </Link>
                                </td>
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
                <Link to="/" className="button">
                    Back
                </Link>
            </div>
        )
    }

}