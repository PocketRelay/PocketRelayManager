import { getGames } from "@api/routes";
import Game from "@components/game/Game";
import Loader from "@components/Loader";
import { useAppContext } from "@contexts/AppContext";
import { ChangeEvent, ReactNode, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "./Games.scss"

export default function Games() {
    const context = useAppContext();
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(10);
    const { data, isLoading, error } = useQuery({
        queryKey: ["games", offset, count],
        queryFn: async () => {
            return await getGames(context);
        }
    });

    let content: ReactNode;

    if (isLoading) {
        content = <Loader />
    } else if (error || !data) {
        content = (
            <div>
                Failed to load games
            </div>
        )
    } else {
        console.table(data);
        content = (
            <div className="list__contents games__values">
                {data.games.map((game, index) => (
                    <Game game={game} key={index} />
                ))}
            </div>
        )
    }

    let prevDisabled: boolean = isLoading || offset <= 0;
    let nextDisabled: boolean = isLoading || !data!.more;

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
        <div className="list">
            <div className="list__actions">
                <Link to="/" className="button">
                    Back
                </Link>
                <button className="button" disabled={prevDisabled} onClick={prevPage}>Previous</button>
                <label className="list__actions__row">
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
            {content}
        </div>
    )
}