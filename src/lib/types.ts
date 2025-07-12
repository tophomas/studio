export type Submission = {
  id: string;
  author: string;
  text: string;
  theme: 'Nature' | 'Urban' | 'Science' | 'Fantasy' | 'Love' | 'Sci-Fi';
  type: 'Poem' | 'Short Story';
  rating: 'General' | 'Mature';
};
