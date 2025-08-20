import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ChatLanderPage from './pages/ChatLanderPage';
import CreateFantasyPage from './pages/CreateFantasyPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lander/:id" element={<ChatLanderPage />} />
        <Route path="/create-fantasy" element={<CreateFantasyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

