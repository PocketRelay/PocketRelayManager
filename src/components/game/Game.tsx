import { Game as GameModel } from "@api/models"
import { BannerData, getData } from "@data/games";
import GamePlayer from "./GamePlayer";
import "./Game.scss"

interface Properties {
    // The game model the game should display
    game: GameModel;
}

/**
 * Component for displaying a game and all the details about
 * the game including the players
 * 
 * @param game The game to display
 */
export default function Game({ game }: Properties) {

    // Obtain the data for the banners from the game attributes
    const data: BannerData[] = getData(game.attributes);

    return (
        <div className="game">
            <div className="game__settings">
                {data.map((value, index) => (
                    <div className="game__banner" key={index}>
                        <img
                            className="game__banner__img"
                            src={`/assets/banners/${value.image}.png`}
                            alt={`${value.name} Image`} />
                        <div className="game__banner__wrapper">
                            <span className="game__banner__name">{value.name}</span>
                            {value.location && (
                                <span className="game__banner__text">
                                    Location: {value.location}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="game__players">
                {game.players.map((player, index) => (
                    <GamePlayer key={index} player={player} />
                ))}
            </div>
        </div>
    )
}
