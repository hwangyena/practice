import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';

const data = Array.from(Array(100).keys());
const loadCount = 20;

export default function ScrollPage() {
  const [get, setGet] = useState(9);
  const [dataLength, setDataLength] = useState(0);

  const target = useRef<HTMLElement>(null);

  useEffect(() => {
    const targetRef = target.current;
    const handleScroll = throttle(() => {
      const position = target.current?.scrollTop;

      if (position === 0) {
        const originPosition = target.current?.scrollHeight;

        setDataLength((p) => p + loadCount);
        target.current?.scrollTo(0, target.current.scrollHeight - (originPosition ?? 0));
      }
    }, 500);

    if (targetRef) {
      targetRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (targetRef) targetRef.removeEventListener('scroll', handleScroll);
    };
  }, [target, setDataLength]);

  useEffect(() => {
    if (target.current) {
      target.current.scrollTo(0, target.current.scrollHeight);
    }
  }, []);

  return (
    <div>
      <h1>Intersection Observer</h1>
      <section ref={target} className="bg-slate-400 w-[300px] h-[500px] p-5 overflow-auto">
        {data
          .slice(0, get)
          .reverse()
          .map((v, i) => (
            <div className="bg-slate-200 w-[200px] h-[100px] mt-5 ml-5" key={i}>
              {v}
            </div>
          ))}
      </section>
    </div>
  );
}
