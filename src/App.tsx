import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { VillainSelection } from './pages/VillainSelection';
import { Game } from './pages/Game';
import { PageTransition } from './components/transitions/PageTransition';
import './i18n/config';
import './App.css';

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<VillainSelection />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </GameProvider>
  );
}