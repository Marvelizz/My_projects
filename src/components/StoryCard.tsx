import { ArrowUpIcon, MessageCircleIcon } from 'lucide-react';
import { Story } from '../types';
import { Link } from 'react-router-dom';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const date = new Date(story.time * 1000).toLocaleDateString();
  
  return (
    <Link to={`/story/${story.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h2>
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
    </Link>
  );
}