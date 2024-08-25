export interface Main {
  info: Info;
  results: Character[];
}

export interface Info {
  count: number;
  next: string;
  pages: number;
  prev: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  location: Location;
  origin: Location;
  species: string;
  type: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}
