import { useContext, useEffect, useState } from 'react';
import ReactFlagsSelect from "react-flags-select";
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { defaultPlayerName, Player } from '../models/Player';
import { getCountryFlagSvg } from '../api/CountryFlags';
import { svgStringToImageSource } from 'tunis-extensions';
import ScoreButton from './buttons/ScoreButton';

export type PlayerControlProps = {
    player: Player;
};

const PlayerControl: React.FC<PlayerControlProps> = (props) => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    const [name, setName] = useState<string>(props.player.name);
    const [countryCode, setCountryCode] = useState<string>(props.player.countryCode);
    const [countrySvg, setCountrySvg] = useState<string>("");

    const handleNameInputBlur = () => {
        if (!name) setName(defaultPlayerName(props.player.id));
    };

    const handleCountrySelect = (countryCode: string) => {
        setCountryCode(countryCode);
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

    return (
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
                <button className={"button"} onClick={() => context.addToPlayerScore(props.player.id, 1)}>+1</button>

                <ScoreButton
                    playerId={props.player.id} points={1}
                />

                <button className={"button"} onClick={() => context.addTime(2)}>+2</button>
                <button className={"button"} onClick={() => context.addTime(3)}>+3</button>
                <button className={"button"} onClick={() => context.addTime(4)}>+4</button>
                <button className={"button"} onClick={() => context.addTime(0)}>+A</button>
                <button className={"button"} onClick={() => context.addTime(0)}>+P</button>

                <button className={"button"} onClick={() => context.addTime(-1)}>-1</button>
                <button className={"button"} onClick={() => context.addTime(-2)}>-2</button>
                <button className={"button"} onClick={() => context.addTime(-3)}>-3</button>
                <button className={"button"} onClick={() => context.addTime(-4)}>-4</button>
                <button className={"button"} onClick={() => context.addTime(-0)}>-A</button>
                <button className={"button"} onClick={() => context.addTime(-0)}>-P</button>
            </div>
        </div>
    );
};

export default PlayerControl;