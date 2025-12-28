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
  start_latlng: [number, number];
  end_latlng: [number, number];
}

export type { SearchParams };
export type { Segment };
