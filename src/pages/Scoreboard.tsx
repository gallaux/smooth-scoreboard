import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import TimerControl from '../components/TimerControl';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { isInteger } from 'tunis-extensions';
import { defaultPlayer, Player } from '../models/Player';
import PlayerScore from '../components/PlayerScore';
import PlayerControl from '../components/PlayerControl';
import { CountryList } from '../models/Country';

import '../css/Scoreboard.css';


const Scoreboard = () => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);
    const location = useLocation();

    const [players, setPlayers] = useState<Player[]>([defaultPlayer(0), defaultPlayer(1)]);

    const queryParams = new URLSearchParams(location.search);

    /* Using query parameters if present. Multiple parameters can be passed simultaneously
       eg. ?duration=10 will set the match duration to 10 minutes
           ?country2=fr will set player 2's country to France
     */
    useEffect(() => {
        const durationParam = queryParams.get("duration");
        if (durationParam && isInteger(durationParam, false, true)) {
            context.setTime(Number(durationParam) * 60);
        }

        const updatedPlayers = [...players];
        for (let i = 0; i < players.length; i++) {
            const nameParam = queryParams.get(`name${(i + 1).toString()}`);
            if (nameParam) {
                updatedPlayers[i].name = nameParam;
            }

            const countryParam = queryParams.get(`country${(i + 1).toString()}`)?.toUpperCase();
            if (countryParam && CountryList.has(countryParam)) {
                updatedPlayers[i].countryCode = countryParam;
            }
        }

        setPlayers(updatedPlayers);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="panel panel-player">
                    <PlayerControl player={players[0]} />
                    <PlayerScore id={0} />
                </div>
                <div className="panel panel-player">
                    <PlayerControl
                        player={players[1]}
                    />
                    <PlayerScore id={1} />
                </div>
                <div className="panel">
                    <div className="panel-control">
                        <TimerControl />
                    </div>
                    <CountdownTimer duration={context.countdown} />
                </div>
            </header>
        </div>
    );
};

export default Scoreboard;