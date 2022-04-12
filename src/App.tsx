import ScoreboardProvider from "./context/ScoreboardContext";
import Scoreboard from "./pages/Scoreboard";

function App() {
    return (
        <ScoreboardProvider>
            <Scoreboard />
        </ScoreboardProvider>
    );
}

export default App;