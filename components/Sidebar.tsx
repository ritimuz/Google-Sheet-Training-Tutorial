
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TUTORIAL_TOPICS } from '../constants';
import { TutorialCategory } from '../types';

const AccordionItem: React.FC<{ category: TutorialCategory; isOpen: boolean; onClick: () => void }> = ({ category, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onClick}
        className="w-full text-left p-4 focus:outline-none flex justify-between items-center transition-colors duration-200 hover:bg-gray-700"
      >
        <span className="font-semibold">{category.title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-gray-800 text-sm">
          {category.topics.map((topic) => (
            <NavLink
              key={topic}
              to={`/topic/${encodeURIComponent(topic)}`}
              className={({ isActive }) =>
                `block p-3 pl-8 transition-colors duration-200 ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-gray-700'
                }`
              }
            >
              {topic}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="w-64 md:w-80 bg-gray-900 text-gray-200 flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-emerald-400">GSheet</span> AI Tutor
        </h1>
        <p className="text-xs text-gray-400 mt-1">Powered by Gemini</p>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {TUTORIAL_TOPICS.map((category, index) => (
          <AccordionItem
            key={category.title}
            category={category}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
