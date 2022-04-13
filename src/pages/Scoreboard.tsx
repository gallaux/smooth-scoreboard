import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import TimerControl from '../components/TimerControl';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { ControlPanelMenu } from '../models/ControlPanelMenu';
import { isInteger } from 'tunis-extensions';
import PlayerScore from '../components/PlayerScore';
import '../css/Scoreboard.css';
import PlayerControl from '../components/PlayerControl';

const Scoreboard = () => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        const durationParam = queryParams.get('duration');
        if (durationParam && isInteger(durationParam, false, true)) {
            context.setTime(Number(durationParam) * 60);
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="panel panel-player">
                    <PlayerControl id={1} />
                    <PlayerScore id={1} />
                </div>
                <div className="panel panel-player">
                    <PlayerControl id={2} />
                    <PlayerScore id={2} />
                </div>
                <div className="panel">
                    <div className="panel-control">
                        {context.controlPanelMenu === ControlPanelMenu.Timer &&
                            <TimerControl />
                        }
                    </div>
                    <CountdownTimer duration={context.countdown} />
                </div>
            </header>
        </div>
    );
};

export default Scoreboard;