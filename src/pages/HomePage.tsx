import { useState, useEffect } from 'react';
import { NewspaperIcon } from 'lucide-react';
import { fetchStories } from '../api';
import { Story } from '../types';
import { StoryCard } from '../components/StoryCard';

export function HomePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchStories(page).then(data => {
      setStories(prev => [...prev, ...data]);
      setIsLoading(false);
    });
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-500 text-white py-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2">
            <NewspaperIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Hacker News Reader</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="space-y-4">
          {stories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {!isLoading && (
          <button
            onClick={() => setPage(p => p + 1)}
            className="mt-8 mb-8 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Load More Stories
          </button>
        )}

        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
      </main>
    </div>
  );
}