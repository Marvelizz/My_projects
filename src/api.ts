const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export async function fetchTopStories(): Promise<number[]> {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  return response.json();
}

export async function fetchItem<T>(id: number): Promise<T> {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
}

export async function fetchStories(page: number = 1, limit: number = 30): Promise<Story[]> {
  const stories = await fetchTopStories();
  const start = (page - 1) * limit;
  const end = start + limit;
  const pageStories = stories.slice(start, end);
  
  return Promise.all(pageStories.map(id => fetchItem(id)));
}