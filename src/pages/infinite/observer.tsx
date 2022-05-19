import { useEffect, useRef, useState } from 'react';

const data = Array.from(Array(30).keys());

export default function Observer() {
  const target = useRef<HTMLDivElement>(null);
  const [dataLength, setDataLength] = useState(9);

  useEffect(() => {
    if (target.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setDataLength((p) => (p += 9));
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(target.current);
    }
  }, [target]);

  return (
    <section>
      <h1>Intersection Observer</h1>
      {data.slice(0, dataLength).map((v, i) => (
        <div className="bg-slate-200 w-[200px] h-[100px] mt-5 ml-5" key={i}>
          {v}
        </div>
      ))}
      <div ref={target}>lasttt</div>
    </section>
  );
}
