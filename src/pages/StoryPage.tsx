import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpIcon, MessageCircleIcon } from 'lucide-react';
import { fetchItem } from '../api';
import { Story } from '../types';
import { Comment } from '../components/Comment';

export function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchItem<Story>(parseInt(id)).then(data => {
        setStory(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!story) return null;

  const date = new Date(story.time * 1000).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-orange-500 text-white py-6 mb-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center space-x-2 text-white mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Stories</span>
          </Link>
          <h1 className="text-2xl font-bold">{story.title}</h1>
          {story.url && (
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white text-sm mt-2 block"
            >
              {story.url}
            </a>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="bg-white rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              {story.score}
            </span>
            <span>by {story.by}</span>
            <span>{date}</span>
            {story.descendants !== undefined && (
              <span className="flex items-center">
                <MessageCircleIcon className="w-4 h-4 mr-1" />
                {story.descendants}
              </span>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {story.kids?.map(commentId => (
          <Comment key={commentId} commentId={commentId} />
        ))}
      </main>
    </div>
  );
}