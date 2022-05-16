import { useCallback, useMemo, useState } from 'react';
import { MemoMovieList, MemoText } from 'src/components/memo';

let movieId = 1;
export type Movie = {
  id: number;
  title: string;
  content: string;
};

const initialMovie: Movie = {
  id: movieId++,
  title: '어벤져스',
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit.\nEarum nemo atque sint perferendis eveniet delectus aliquam itaque quasi! Illo necessitatibus sed ut inventore. Dolorem, totam maiores? Nobis dolorum optio non.`,
};

export default function MemoPage() {
  const [movies, setMovies] = useState<Movie[]>([initialMovie]);

  const onAddMovie = ({ content, title }: Omit<Movie, 'id'>) => {
    setMovies((p) => [...p, { title, content, id: movieId++ }]);
  };
  const onDeleteMovie = (id: number) => {
    setMovies((p) => p.filter((v) => v.id !== id));
  };

  ////

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const handleA = () => {
    console.log('A:', a);
    setA((p) => p + 1);
  };
  const handleB = () => {
    console.log('B:', b);
    setB((p) => p + 1);
  };

  //logged only when a changes
  const testMemo = useMemo(() => {
    console.log('memo[A]:', b);
    return b;
  }, [a]);

  //logged whenever rendering, but updated only when a changes
  const testCallback = useCallback(() => {
    console.log('callback[B]:', b);
    return b;
  }, [a]);

  return (
    <>
      <h1>React 성능 향상</h1>
      <h3>총 영화 수 : {movies.length}</h3>
      <MemoText {...{ onAddMovie }} />
      <MemoMovieList {...{ movies, onDeleteMovie }} />

      <hr className="mt-5" />
      <h1>MEMO vs CALLBACK</h1>
      <h3>콘솔을 확인하세요! 👏</h3>
      <p>MEMO[A]:: {testMemo}</p>
      <p>CALLBACK[B]:: {testCallback()}</p>
      <button onClick={handleA} className="bg-slate-200">
        update A
      </button>
      <button onClick={handleB} className="bg-slate-200 ml-5">
        update B
      </button>
    </>
  );
}
