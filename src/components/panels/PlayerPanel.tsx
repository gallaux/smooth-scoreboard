import { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { svgStringToImageSource } from "tunis-extensions";
import { getCountryFlagSvg } from "../../api/CountryFlags";
import { ScoreboardContext, ScoreboardContextType } from "../../context/ScoreboardContext";
import useScoreCounter from "../../hooks/useScoreCounter";
import { defaultPlayerName, Player, PlayerId } from "../../models/Player";
import { ScoreType } from "../../models/Score";
import ScoreButton from "../buttons/ScoreButton";
import ScoreCounter from "../ScoreCounter";

interface PlayerPanelProps {
    player: Player;
};

const PlayerPanel: React.FC<PlayerPanelProps> = (props) => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    const { score, addToScore, resetScore } = useScoreCounter();
    const [name, setName] = useState<string>(props.player.name);
    const [countryCode, setCountryCode] = useState<string>(props.player.countryCode);
    const [countrySvg, setCountrySvg] = useState<string>("");

    const handleNameInputBlur = () => {
        if (!name) setName(defaultPlayerName(props.player.id));
    };

    const handleCountrySelect = (countryCode: string) => {
        setCountryCode(countryCode);
    };

    const getScoreCounterClass = (playerId: PlayerId): string => {
        return `panel-player-points points-p${props.player.id.toString()}`;
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
        if (countryCode) {
            getCountryFlagSvg(countryCode).then(svg => setCountrySvg(svgStringToImageSource(svg)));
        }
    }, [countryCode]);

    useEffect(() => {
        if (context.isMatchResetting) {
            resetScore();
        }
    }, [context.isMatchResetting]);

    return (
        <div className="panel panel-player">
            <div className="panel-player-control">
                <div>
                    <ReactFlagsSelect
                        id={`player${props.player.id.toString()}-flag-select`}
                        className={"flags-select"}
                        selected={countryCode}
                        onSelect={handleCountrySelect}
                        searchable
                    />
                    {countrySvg &&
                        <img src={countrySvg} alt="" style={{ width: "160px", height: "112px" }} />
                    }
                </div>
                <input
                    id={`player${props.player.id.toString()}-name-input`}
                    type="text"
                    value={name}
                    onChange={(e) => setName((e.target.value).toUpperCase())}
                    onBlur={handleNameInputBlur}
                    maxLength={20}
                />
                <div>
                    <div>
                        <ScoreButton score={1} type={ScoreType.points} onClick={() => addToScore(1, ScoreType.points)} />
                        <ScoreButton score={2} type={ScoreType.points} onClick={() => addToScore(2, ScoreType.points)} />
                        <ScoreButton score={3} type={ScoreType.points} onClick={() => addToScore(3, ScoreType.points)} />
                        <ScoreButton score={4} type={ScoreType.points} onClick={() => addToScore(4, ScoreType.points)} />
                        <ScoreButton score={1} type={ScoreType.advantages} onClick={() => addToScore(1, ScoreType.advantages)} />
                        <ScoreButton score={1} type={ScoreType.penalties} onClick={() => addToScore(1, ScoreType.penalties)} />
                    {/*</div>*/}
                    {/*<div>*/}
                        <ScoreButton score={-1} type={ScoreType.points} onClick={() => addToScore(-1, ScoreType.points)} />
                        <ScoreButton score={-2} type={ScoreType.points} onClick={() => addToScore(-2, ScoreType.points)} />
                        <ScoreButton score={-3} type={ScoreType.points} onClick={() => addToScore(-3, ScoreType.points)} />
                        <ScoreButton score={-4} type={ScoreType.points} onClick={() => addToScore(-4, ScoreType.points)} />
                        <ScoreButton score={-1} type={ScoreType.advantages} onClick={() => addToScore(-1, ScoreType.advantages)} />
                        <ScoreButton score={-1} type={ScoreType.penalties} onClick={() => addToScore(-1, ScoreType.penalties)} />
                    </div>
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