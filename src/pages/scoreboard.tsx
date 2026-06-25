import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isInteger } from 'tunis-extensions';
import { defaultMatchDuration, defaultPlayer, Player } from '../models/player';
import { CountryList } from '../models/country';
import TimerPanel from '../components/panels/timerPanel';
import PlayerPanel from '../components/panels/playerPanel';
import '../css/scoreboard.scss';

const Scoreboard = () => {
  const location = useLocation();

  const [players, setPlayers] = useState<Player[]>([defaultPlayer(1), defaultPlayer(2)]);
  const [duration, setDuration] = useState<number>(defaultMatchDuration);

  /* Using query parameters if present. Multiple parameters can be passed simultaneously
     eg. ?duration=10 will set the match duration to 10 minutes
       ?country2=fr will set player 2's country to France
   */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const durationParam = queryParams.get("duration");
    if (durationParam && isInteger(durationParam, false, true)) {
      setDuration(Number(durationParam) * 60);
    }

    const initialPlayers = [defaultPlayer(1), defaultPlayer(2)];
    for (let i = 0; i < initialPlayers.length; i++) {
      const nameParam = queryParams.get(`name${(i + 1).toString()}`);
      if (nameParam) {
        initialPlayers[i].name = nameParam;
      }

      const countryParam = queryParams.get(`country${(i + 1).toString()}`)?.toUpperCase();
      if (countryParam && CountryList.has(countryParam)) {
        initialPlayers[i].countryCode = countryParam;
      }
    }

    setPlayers(initialPlayers);
  }, [location.search]);

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