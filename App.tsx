
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-100 font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topic/:topicName" element={<TopicPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
