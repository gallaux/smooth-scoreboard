import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isInteger } from 'tunis-extensions';
import { defaultMatchDuration, defaultPlayer, Player } from '../models/Player';
import { CountryList } from '../models/Country';
import TimerPanel from '../components/panels/TimerPanel';
import PlayerPanel from '../components/panels/PlayerPanel';
import '../css/scoreboard.scss';

const Scoreboard = () => {
    const location = useLocation();

    const [players, setPlayers] = useState<Player[]>([defaultPlayer(1), defaultPlayer(2)]);
    const [duration, setDuration] = useState<number>(defaultMatchDuration);

    const queryParams = new URLSearchParams(location.search);

    /* Using query parameters if present. Multiple parameters can be passed simultaneously
       eg. ?duration=10 will set the match duration to 10 minutes
           ?country2=fr will set player 2's country to France
     */
    useEffect(() => {
        const durationParam = queryParams.get("duration");
        if (durationParam && isInteger(durationParam, false, true)) {
            setDuration(Number(durationParam) * 60);
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
        <div className="app-grid">
            <div className="player1-panel">
                <PlayerPanel player={players[0]} />
            </div>
            <div className="player2-panel">
                <PlayerPanel player={players[1]} />
            </div>
            <div className="timer-panel">
                <TimerPanel duration={duration} />
            </div>
        </div>
    );
};

export default Scoreboard;