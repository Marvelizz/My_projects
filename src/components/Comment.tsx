import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { Comment as CommentType } from '../types';
import { fetchItem } from '../api';

interface CommentProps {
  commentId: number;
  depth?: number;
}

export function Comment({ commentId, depth = 0 }: CommentProps) {
  const [comment, setComment] = useState<CommentType | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    fetchItem<CommentType>(commentId).then(data => {
      setComment(data);
      setIsLoading(false);
    });
  }, [commentId]);

  if (isLoading || !comment || !comment.text) return null;

  const date = new Date(comment.time * 1000).toLocaleDateString();

  return (
    <div className="mt-4" style={{ marginLeft: `${depth * 20}px` }}>
      <div className="bg-white rounded p-4">
        <div className="flex items-center space-x-2 mb-2">
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>
          <span className="font-medium">{comment.by}</span>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
        {isExpanded && (
          <>
            <div 
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
            {comment.kids?.map(kidId => (
              <Comment key={kidId} commentId={kidId} depth={depth + 1} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}