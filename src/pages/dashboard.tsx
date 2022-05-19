import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useUser } from 'src/lib/endpoints/employees';

const data = Array.from(Array(30).keys());

export default function Dashboard() {
  const target = useRef<HTMLDivElement>(null);
  const [get, setGet] = useState(9);

  useEffect(() => {
    console.log('traget', target.current);

    if (target.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setGet((p) => (p += 9));
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(target.current);
    }
  }, [target]);

  return (
    <div>
      <section>
        <h1>Intersection Observer</h1>
        {data.slice(0, get).map((v, i) => (
          <div className="bg-slate-200 w-[200px] h-[100px] mt-5 ml-5" key={i}>
            {v}
          </div>
        ))}
        <div ref={target}>lasttt</div>
      </section>
    </div>
  );
}
