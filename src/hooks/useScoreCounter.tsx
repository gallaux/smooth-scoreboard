import { useState } from 'react';
import { defaultScore, Score, ScoreType } from '../models/Score';

const maximumScore = 99;
const minimumScore = 0;

const useScoreCounter = () => {
    const [score, setScore] = useState<Score>(defaultScore);

    const addToScore = (value: number, type: ScoreType) => {
        const updatedScore: Score = { ...score };
        if (type === ScoreType.points) {
            updatedScore.points += value;
            if (updatedScore.points < minimumScore) {
                updatedScore.points = minimumScore;
            } else if (updatedScore.points > maximumScore) {
                updatedScore.points = maximumScore;
            }
        } else if (type === ScoreType.advantages) {
            updatedScore.advantages += value;
            if (updatedScore.advantages < minimumScore) {
                updatedScore.advantages = minimumScore;
            } else if (updatedScore.advantages > maximumScore) {
                updatedScore.advantages = maximumScore;
            }
        } else if (type === ScoreType.penalties) {
            updatedScore.penalties += value;
            if (updatedScore.penalties < minimumScore) {
                updatedScore.penalties = minimumScore;
            } else if (updatedScore.penalties > maximumScore) {
                updatedScore.penalties = maximumScore;
            }
        }

        setScore(updatedScore);
    };

    const resetScore = () => {
        setScore(defaultScore);
    };

    return { score, addToScore, resetScore };
};

export default useScoreCounter;