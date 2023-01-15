import { GamePlayer as GamePlayerModel } from "@api/models"

interface Properties {
    // The player this component represents
    player: GamePlayerModel;
}

/**
 * Component for displaying the details about a player
 * in a game. Displays the ip addreses and connection
 * types along with basic details such as name and ID
 * 
 * @param player The player to display
 */
export default function GamePlayer({ player }: Properties) {

    const { internal, external } = player.net.groups;

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
