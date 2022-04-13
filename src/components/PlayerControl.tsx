import { useContext, useEffect, useState } from 'react';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { PlayerId } from '../models/Player';
import ReactFlagsSelect from "react-flags-select";
import { getCountryFlagSvg } from '../api/CountryFlags';
import { svgStringToImageSource } from 'tunis-extensions';

export type PlayerControlProps = {
    id: PlayerId;
    name: string;
};

const PlayerControl: React.FC<PlayerControlProps> = (props) => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    const defaultPlayerName = `PLAYER ${props.id.toString()}`;
    const defaultPlayerCountry = props.id === 1 ? "BR" : "US";

    const [name, setName] = useState(props.name);
    const [countryCode, setCountryCode] = useState(defaultPlayerCountry);
    const [countrySvg, setCountrySvg] = useState("");

    const handleNameInputBlur = () => {
        if (!name) setName(defaultPlayerName);
    };

    const handleCountrySelect = (countryCode: string) => {
        setCountryCode(countryCode);
    };

    useEffect(() => {
        setName(props.name.toUpperCase());
    }, [props.name]);

    useEffect(() => {
        if (countryCode) {
            getCountryFlagSvg(countryCode).then(svg => setCountrySvg(svgStringToImageSource(svg)));
        }
    }, [countryCode]);

    return (
        <div className="panel-player-control">
            <input
                id={`player${props.id.toString()}-name-input`}
                type="text"
                value={name}
                onChange={(e) => setName((e.target.value).toUpperCase())}
                onBlur={handleNameInputBlur}
                maxLength={20}
            />
            <ReactFlagsSelect
                id={`player${props.id.toString()}-flag-select`}
                className={"flags-select"}
                selected={countryCode}
                onSelect={handleCountrySelect}
                searchable
            />
            {countrySvg &&
                <img src={countrySvg} alt="" style={{ width: "160px", height: "112px" }} />
            }
        </div>
    );
};

export default PlayerControl;