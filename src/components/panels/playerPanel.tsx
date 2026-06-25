import { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { getCountryFlagUrl } from "../../api/countryFlags";
import { ScoreboardContext, ScoreboardContextType } from "../../context/scoreboardContext";
import useScoreCounter from "../../hooks/useScoreCounter";
import { defaultPlayerName, Player, PlayerId } from "../../models/player";
import { ScoreType } from "../../models/score";
import ScoreButton from "../buttons/scoreButton";
import ScoreCounter from "../scoreCounter";

interface PlayerPanelProps {
  player: Player;
};

const PlayerPanel: React.FC<PlayerPanelProps> = (props) => {
  const context: ScoreboardContextType = useContext(ScoreboardContext);

  const { score, addToScore, resetScore } = useScoreCounter();
  const [name, setName] = useState<string>(props.player.name);
  const [countryCode, setCountryCode] = useState<string>(props.player.countryCode);

  const handleNameInputBlur = () => {
    if (!name) setName(defaultPlayerName(props.player.id));
  };

  const handleCountrySelect = (countryCode: string) => {
    setCountryCode(countryCode);
  };

  const getScoreCounterClass = (playerId: PlayerId): string => {
    return `score-points points-p${playerId.toString()}`;
  };

  useEffect(() => {
    if (props.player.name) {
      setName(props.player.name.toUpperCase());
    }
  }, [props.player.name]);

  useEffect(() => {
    if (props.player.countryCode) {
      setCountryCode(props.player.countryCode);
    }
  }, [props.player.countryCode]);

  useEffect(() => {
    if (context.isMatchResetting) {
      resetScore();
    }
  }, [context.isMatchResetting, resetScore]);

  return (
    <div className="panel-player-grid">
      <div className="player-country">
        <div className="player-flag-select">
          <ReactFlagsSelect
            id={`player${props.player.id.toString()}-flag-select`}
            className={"flags-select"}
            selected={countryCode}
            onSelect={handleCountrySelect}
            searchable
          />
        </div>
        <div className="player-flag">
          {countryCode &&
            <img src={getCountryFlagUrl(countryCode)} alt="" />
          }
        </div>
      </div>
      <div className="player-name">
        <input
          id={`player${props.player.id.toString()}-name-input`}
          type="text"
          className={"player-name-input"}
          value={name}
          onChange={(e) => setName((e.target.value).toUpperCase())}
          onBlur={handleNameInputBlur}
          maxLength={20}
        />
      </div>

      <div className="player-score-controls">
        <div className="player-score-controls-positive">
          <ScoreButton score={1} type={ScoreType.points} onClick={() => addToScore(1, ScoreType.points)} />
          <ScoreButton score={2} type={ScoreType.points} onClick={() => addToScore(2, ScoreType.points)} />
          <ScoreButton score={3} type={ScoreType.points} onClick={() => addToScore(3, ScoreType.points)} />
          <ScoreButton score={4} type={ScoreType.points} onClick={() => addToScore(4, ScoreType.points)} />
          <ScoreButton score={1} type={ScoreType.advantages} onClick={() => addToScore(1, ScoreType.advantages)} />
          <ScoreButton score={1} type={ScoreType.penalties} onClick={() => addToScore(1, ScoreType.penalties)} />
        </div>
        <div className="player-score-controls-negative">
          <ScoreButton score={-1} type={ScoreType.points} onClick={() => addToScore(-1, ScoreType.points)} />
          <ScoreButton score={-2} type={ScoreType.points} onClick={() => addToScore(-2, ScoreType.points)} />
          <ScoreButton score={-3} type={ScoreType.points} onClick={() => addToScore(-3, ScoreType.points)} />
          <ScoreButton score={-4} type={ScoreType.points} onClick={() => addToScore(-4, ScoreType.points)} />
          <ScoreButton score={-1} type={ScoreType.advantages} onClick={() => addToScore(-1, ScoreType.advantages)} />
          <ScoreButton score={-1} type={ScoreType.penalties} onClick={() => addToScore(-1, ScoreType.penalties)} />
        </div>
      </div>
      <ScoreCounter
        score={score}
        className={getScoreCounterClass(props.player.id)}
        onPointsClick={() => addToScore(1, ScoreType.points)}
        onAdvantagesClick={() => addToScore(1, ScoreType.advantages)}
        onPenaltiesClick={() => addToScore(1, ScoreType.penalties)}
      />
    </div>
  );
};

export default PlayerPanel;