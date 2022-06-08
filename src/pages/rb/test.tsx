import { useRef, useState } from 'react';

export default function TestPage() {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState('');
  const [show, setShow] = useState('');

  const handleCheckValue = () => {
    setShow(value.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
  };

  return (
    <div className="m-5">
      <textarea className="border" ref={ref} value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleCheckValue}>check</button>
      <p>{show}</p>
    </div>
  );
}
