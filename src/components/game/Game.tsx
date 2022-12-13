import { Game as GameModel, GamePlayer as GamePlayerModel } from "@api/models"
import { DIFFICULTY_ATTR as CHALLENGE_ATTR, CHALLENGES, ENEMIES, ENEMY_ATTR, getMap, Map, MAP_ATTR, VISIBILITIES, VISIBILITY_ATTR } from "@data/games";
import "./Game.scss"

interface Properties {
    game: GameModel;
}

export default function Game({ game }: Properties) {
    return (
        <div className="game" data-owned="true">
            <div className="game__settings">
                <GameVisibility game={game} />
                <GameMap game={game} />
                <GameEnemy game={game} />
                <GameChallenge game={game} />
            </div>
            <div className="game__players">
                {game.players.map((player, index) => (
                    <GamePlayer key={index} player={player} />
                ))}
            </div>
        </div>
    )
}

function GamePlayer({ player }: { player: GamePlayerModel }) {

    const internal = player.net.groups.internal;
    const external = player.net.groups.external;

    return (
        <div className="game__player">
            <span className="game__player__name">{player.display_name} <span className="game__player__id">(ID: {player.player_id})</span></span>
            <div className="game__player__attrs">
                <div className="game__player__attr">
                    <span className="game__player__attr__name">Internal Address:</span>
                    <span className="game__player__attr__value game__player__attr__value--hidden">
                        {internal.address}:{internal.port}
                    </span>
                </div>
                <div className="game__player__attr">
                    <span className="game__player__attr__name">External Address:</span>
                    <span className="game__player__attr__value game__player__attr__value--hidden">
                        {external.address}:{external.port}
                    </span>
                </div>

                <div className="game__player__attr">
                    <span className="game__player__attr__name">NATT:</span>
                    <span className="game__player__attr__value">
                        {player.net.qos.natt}
                    </span>
                </div>
            </div>
        </div>
    )
}

function GameVisibility({ game }: Properties) {
    const visAttr = game.attributes[VISIBILITY_ATTR];
    const vis = VISIBILITIES[visAttr ?? 'random'];
    const visImage: string = `/assets/mp/visibility/${vis.image}.png`;

    return (
        <div className="game__banner">
            <img className="game__banner__img" src={visImage} alt={`${vis.name} Image`} />
            <div className="game__banner__wrapper">
                <span className="game__banner__name">{vis.name}</span>
            </div>
        </div>
    )
}

function GameEnemy({ game }: Properties) {
    const enemyAttr = game.attributes[ENEMY_ATTR];
    const enemy = ENEMIES[enemyAttr ?? 'random'];
    const enemyImage: string = `/assets/mp/enemy/${enemy.image}.png`;

    return (
        <div className="game__banner">
            <img className="game__banner__img" src={enemyImage} alt={`${enemy.name} Image`} />
            <div className="game__banner__wrapper">
                <span className="game__banner__name">{enemy.name}</span>
            </div>
        </div>
    )
}

function GameChallenge({ game }: Properties) {
    const challengeAttr = game.attributes[CHALLENGE_ATTR];
    const challenge = CHALLENGES[challengeAttr ?? 'random'];
    const challengeImage: string = `/assets/mp/challenge/${challenge.image}.png`;

    return (
        <div className="game__banner">
            <img className="game__banner__img" src={challengeImage} alt={`${challenge.name} Image`} />
            <div className="game__banner__wrapper">
                <span className="game__banner__name">{challenge.name}</span>
            </div>
        </div>
    )
}



function GameMap({ game }: Properties) {
    const map: Map = getMap(game.attributes[MAP_ATTR]);
    const mapImage: string = `/assets/mp/maps/${map.image}.png`;

    return (
        <div className="game__banner">
            <img className="game__banner__img" src={mapImage} alt={`${map.name} Image`} />
            <div className="game__banner__wrapper">
                <span className="game__banner__name">{map.name}</span>
                <span className="game__banner__text">Location: {map.location}</span>
            </div>
        </div>
    )
}