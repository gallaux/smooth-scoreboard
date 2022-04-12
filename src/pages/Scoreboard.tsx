import { useContext } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import TimerControl from '../components/TimerControl';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { ControlPanelMenu } from '../models/ControlPanelMenu';
import '../css/Scoreboard.css';

function Scoreboard() {
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    return (
        <div className="App">
            <header className="App-header">
                <div className="panel panel-player" >
                    Panel 1
                </div>
                <div className="panel panel-player">
                    Panel 2
                </div>
                <div className="panel">
                    <div className="panel-control">
                        {context.controlPanelMenu === ControlPanelMenu.Timer &&
                            <TimerControl />
                        }
                    </div>
                    <CountdownTimer duration={3} />
                </div>
            </header>
        </div>
    );
};

export default Scoreboard;