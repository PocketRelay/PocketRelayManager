import { Game as GameModel } from "@api/models"
import "./Game.scss"

interface Properties {
    game: GameModel;
}

export default function Game({ game }: Properties) {
    return (
        <div>
            {JSON.stringify(game)}
        </div>
    )
}
