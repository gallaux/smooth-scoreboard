import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import TimerControl from '../components/TimerControl';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { isInteger } from 'tunis-extensions';
import PlayerScore from '../components/PlayerScore';
import PlayerControl from '../components/PlayerControl';
import { PlayerId } from '../models/Player';
import '../css/Scoreboard.css';

const defaultPlayerName = (id: PlayerId): string => `PLAYER ${id.toString()}`;

const Scoreboard = () => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);
    const location = useLocation();

    const [playerName1, setPlayerName1] = useState<string>(defaultPlayerName(1));
    const [playerName2, setPlayerName2] = useState<string>(defaultPlayerName(2));

    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        const durationParam = queryParams.get("duration");
        if (durationParam && isInteger(durationParam, false, true)) {
            context.setTime(Number(durationParam) * 60);
        }

        const name1Param = queryParams.get("name1");
        if (name1Param) {
            setPlayerName1(name1Param);
        }
        const name2Param = queryParams.get("name2");
        if (name2Param) {
            setPlayerName2(name2Param);
        }
    }, [playerName1, playerName2]);

    return (
        <div className="App">
            <header className="App-header">
                <div className="panel panel-player">
                    <PlayerControl id={1} name={playerName1} />
                    <PlayerScore id={1} />
                </div>
                <div className="panel panel-player">
                    <PlayerControl id={2} name={playerName2} />
                    <PlayerScore id={2} />
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