import { Game as GameModel } from "@api/models"
import { DIFFICULTY_ATTR, DIFFICULTY_IMAGES, ENEMY_ATTR, ENEMY_IMAGES, getMap, Map, MAP_ATTR } from "@data/games";
import "./Game.scss"

interface Properties {
    game: GameModel;
}

export default function Game({ game }: Properties) {

    const difficultyImageName: string = DIFFICULTY_IMAGES[game.attributes[DIFFICULTY_ATTR]];
    const difficultyImage: string = `/assets/mp/${difficultyImageName}`;

    const enemyImageName: string = ENEMY_IMAGES[game.attributes[ENEMY_ATTR]];
    const enemyImage: string = `/assets/mp/${enemyImageName}`;

    return (
        <div className="game">
            {/*  Team */}
            <GameMap game={game} />
            <img src={enemyImage}></img>
            <img src={difficultyImage}></img>
            {JSON.stringify(game)}
        </div>
    )
}


function GameMap({ game }: Properties) {
    const map: Map = getMap(game.attributes[MAP_ATTR]);
    const mapImage: string = `/assets/mp/maps/${map.image}.png`;

    return (
        <div className="game__map">
            <img className="game__map__img" src={mapImage} alt={`${map.name} Image`} />
            <span className="game__map__name">{map.name}</span>
            <span className="game__map__location">{map.location}</span>
        </div>
    )
}