interface SearchParams {
  location: string;
  radius: number;
}

interface Segment {
  id: number;
  name: string;
  distance: number;
  avg_grade: number;
  difficulty: string;
}

export type { SearchParams };
export type { Segment };
