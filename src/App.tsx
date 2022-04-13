import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScoreboardProvider from "./context/ScoreboardContext";
import Scoreboard from "./pages/Scoreboard";

const App = () => {
    return (
        <ScoreboardProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Scoreboard />} />
                </Routes>
            </BrowserRouter>
        </ScoreboardProvider>
    );
}

export default App;