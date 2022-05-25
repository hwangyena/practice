interface Song {
  artistName: string;
}

interface Song {
  songName: string;
}

export const song: Song = {
  artistName: 'Freddie',
  songName: 'The Chain',
};

type Singer = {
  name: string;
};
type Singer = {
  age: number;
};
