import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import TimerControl from '../components/TimerControl';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { isInteger } from 'tunis-extensions';
import PlayerScore from '../components/PlayerScore';
import PlayerControl from '../components/PlayerControl';
import { CountryList } from '../models/Country';

import '../css/Scoreboard.css';

const Scoreboard = () => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);
    const location = useLocation();

    const [playerName1, setPlayerName1] = useState<string | undefined>(undefined);
    const [playerName2, setPlayerName2] = useState<string | undefined>(undefined);
    const [playerCountry1, setPlayerCountry1] = useState<string | undefined>(undefined);
    const [playerCountry2, setPlayerCountry2] = useState<string | undefined>(undefined);

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

        const country1Param = queryParams.get("country1")?.toUpperCase();
        if (country1Param && CountryList.has(country1Param)) {
            setPlayerCountry1(country1Param);
        }
        const country2Param = queryParams.get("country2")?.toUpperCase();
        if (country2Param && CountryList.has(country2Param)) {
            setPlayerCountry2(country2Param);
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="panel panel-player">
                    <PlayerControl
                        id={1}
                        name={playerName1}
                        countryCode={playerCountry1}
                    />
                    <PlayerScore id={1} />
                </div>
                <div className="panel panel-player">
                    <PlayerControl
                        id={2}
                        name={playerName2}
                        countryCode={playerCountry2}
                    />
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