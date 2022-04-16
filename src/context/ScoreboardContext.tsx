import { createContext, useContext, useState } from "react";
import useCountdownTimer from "../hooks/useCountdownTimer";
import { PlayerId } from "../models/Player";
import { defaultScore, Score } from "../models/Score";

export const defaultMatchDuration: number = 5 * 60;

export type ScoreboardContextType = {
    resetMatch: () => void;

    // Player
    scores: Score[];

    addToPlayerScore: (id: PlayerId, point?: number, advantage?: number, penalty?: number) => void;
    setPlayerScore: (id: PlayerId, point?: number, advantage?: number, penalty?: number) => void;

    // Countdown timer hook
    countdown: number;
    addTime: (seconds: number) => void;
    isCounting: boolean;
    setTime: (seconds: number) => void;
    toggleCountdown: () => void;
};

export const ScoreboardContext = createContext<ScoreboardContextType>({
    resetMatch: () => { },

    scores: [],
    addToPlayerScore: () => { },
    setPlayerScore: () => { },

    // Countdown timer hook
    countdown: 0,
    addTime: () => { },
    isCounting: false,
    setTime: () => { },
    toggleCountdown: () => { }
});
export const useScoreboardContext = () => useContext(ScoreboardContext);

const ScoreboardProvider = ({ ...props }) => {
    const { countdown, addTime, isCounting, resetTimer, setTime, toggleCountdown } = useCountdownTimer(defaultMatchDuration);
    const [scores, setScores] = useState<Score[]>([defaultScore(), defaultScore()]);

    const resetMatch = () => {
        resetTimer();
        resetScore();
    };

    const resetScore = () => {
        setPlayerScore(0);
        setPlayerScore(1);
    };

    const setPlayerScore = (id: PlayerId, point?: number, advantage?: number, penalty?: number) => {
        const updatedScore = [...scores];
        updatedScore[id].point = (point === undefined) ? 0 : point;
        updatedScore[id].advantage = (advantage === undefined) ? 0 : advantage;
        updatedScore[id].penalty = (penalty === undefined) ? 0 : penalty;

        setScores(updatedScore);
    };

    const addToPlayerScore = (id: PlayerId, point?: number, advantage?: number, penalty?: number) => {
        const updatedScore = [...scores];
        updatedScore[id].point += (point === undefined) ? 0 : point;
        updatedScore[id].advantage += (advantage === undefined) ? 0 : advantage;
        updatedScore[id].penalty += (penalty === undefined) ? 0 : penalty;

        setScores(updatedScore);
    };

    return (
        <ScoreboardContext.Provider value={{
            resetMatch,

            scores, addToPlayerScore, setPlayerScore,

            countdown, addTime, isCounting, setTime, toggleCountdown
        }} >
            {props.children}
        </ScoreboardContext.Provider>
    );
}

export default ScoreboardProvider;