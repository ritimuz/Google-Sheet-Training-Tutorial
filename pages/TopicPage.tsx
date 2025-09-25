
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { generateTutorialContent } from '../services/geminiService';

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <svg className="animate-spin -ml-1 mr-3 h-16 w-16 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Generating Your Tutorial...</h2>
        <p className="text-gray-500 mt-2">Our AI is crafting a detailed guide for you. Please wait a moment.</p>
    </div>
);

const TopicPage: React.FC = () => {
  const { topicName } = useParams<{ topicName: string }>();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!topicName) return;

      setIsLoading(true);
      setError(null);
      setContent('');

      try {
        const decodedTopicName = decodeURIComponent(topicName);
        const generatedContent = await generateTutorialContent(decodedTopicName);
        setContent(generatedContent);
      } catch (err) {
        setError('Failed to fetch content. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [topicName]);

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md min-h-full">
      {isLoading && <LoadingSpinner />}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading && !error && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
};

export default TopicPage;
