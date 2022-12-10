import { Game as GameModel } from "@api/models"
import { DIFFICULTY_ATTR, DIFFICULTY_IMAGES, ENEMY_ATTR, ENEMY_IMAGES } from "@data/games";
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
        <div>
            <img src={enemyImage}></img>
            <img src={difficultyImage}></img>
            {JSON.stringify(game)}
        </div>
    )
}
