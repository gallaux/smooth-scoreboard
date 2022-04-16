import { createContext, useContext, useEffect, useState } from "react";

export type ScoreboardContextType = {
    isMatchResetting: boolean;
    setIsMatchResetting: (reset: boolean) => void;
};

export const ScoreboardContext = createContext<ScoreboardContextType>({
    isMatchResetting: false,
    setIsMatchResetting: () => { }
});
export const useScoreboardContext = () => useContext(ScoreboardContext);

const ScoreboardProvider = ({ ...props }) => {
    const [isMatchResetting, setIsMatchResetting] = useState(false);

    useEffect(() => {
        if (isMatchResetting) {
            setIsMatchResetting(false);
        }
    }, [isMatchResetting]);

    return (
        <ScoreboardContext.Provider value={{
            isMatchResetting, setIsMatchResetting
        }} >
            {props.children}
        </ScoreboardContext.Provider>
    );
}

export default ScoreboardProvider;