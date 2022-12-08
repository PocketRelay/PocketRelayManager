import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom";
import { GetPlayersResponse } from "@api/models";
import { getPlayers } from "@api/routes";
import Loader from "@components/Loader";
import { useAppContext } from "@contexts/AppContext";
import { useAsyncRetry } from "react-use";
import "./Players.scss";

export default function Players() {
    const appContext = useAppContext();
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(10);


    const { value, error, loading, retry } = useAsyncRetry(
        async () => {
            const response: GetPlayersResponse = await getPlayers(appContext, offset, count);
            if (response.players.length == 0 && offset > 0) {
                setOffset(offset => offset - 1);
            }
            return response;
        },
        [offset, count, appContext]
    );



    if (error) {
        return (
            <div>
                <h1>Failed to load players</h1>
                <button className="button" onClick={() => retry()}>Retry</button>
                <Link to="/" className="button">
                    Back
                </Link>
            </div>
        )
    }

    let prevDisabled: boolean = offset <= 0 || loading;
    let nextDisabled: boolean = loading || !value!.more;

    function nextPage() {
        setOffset(offset => offset + 1);
    }

    function prevPage() {
        setOffset(offset => offset == 0 ? 0 : offset - 1);
    }

    function onRowsEvent(event: ChangeEvent<HTMLSelectElement>) {
        let value: number = parseInt(event.target.value);
        if (Number.isNaN(value)) {
            value = 10;
        }
        setCount(value);
    }

    return (
        <div className="players">
            <div className="players__actions">
                <Link to="/" className="button">
                    Back
                </Link>
                <button className="button" disabled={prevDisabled} onClick={prevPage}>Previous</button>
                <label className="players__rows">
                    <span>Rows</span>
                    <select className="select" name="" id="" value={count} onChange={onRowsEvent}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </label>
                <button className="button" disabled={nextDisabled} onClick={nextPage}>Next</button>
            </div>
            {loading ? <Loader /> : (
                <div className="table-wrapper">
                    <table className="table">
                        <thead className="table__head">
                            <tr className="table__head__row">
                                <th>ID</th>
                                <th>Display Name</th>
                                <th>Email</th>
                                <th>Origin</th>
                                <th>Credits</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {value!.players.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.id}</td>
                                    <td>{player.display_name}</td>
                                    <td>{player.email}</td>
                                    <td>{player.origin ? "Yes" : "No"}</td>
                                    <td>{player.credits}</td>
                                    <td>
                                        <Link
                                            to={"/players/" + player.id}
                                            className="players__edit">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}