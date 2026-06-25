import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScoreboardProvider from './context/scoreboardContext';
import Scoreboard from './pages/scoreboard';

const App = () => {
  return (
    <ScoreboardProvider>
      <BrowserRouter basename="/web_apps/smooth-scoreboard" future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Scoreboard />} />
        </Routes>
      </BrowserRouter>
    </ScoreboardProvider>
  );
};

export default App;