import { ChangeEvent, useEffect, useState, FocusEvent } from 'react';

type Props = {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
  placeholder?: string;
};

const DropDown = ({ options, value, placeholder, onSelect }: Props) => {
  const [focus, setFocus] = useState(true);

  const onSelectItem = (v: string) => {
    if (v === value) {
      setFocus(false);
      return;
    }
    onSelect(v);
    setFocus(false);
  };

  const onBlur = (e: FocusEvent<HTMLButtonElement, Element>) => {
    e.stopPropagation();
    setFocus(false);
  };

  return (
    <button className="relative min-w-[180px]" onBlur={onBlur}>
      <div
        onClick={() => setFocus((p) => !p)}
        className="flex border-2 rounded-md items-center cursor-pointer px-2 w-full  justify-between"
      >
        <div className="placeholder:text-slate-200 m-1">
          {value ? <span>{value}</span> : <span className="text-slate-300">{placeholder || '선택해주세요.'}</span>}
        </div>
        <div className="w-6 overflow-hidden inline-block  translate-y-1">
          <div className="h-4 bg-slate-200 -rotate-45 transform origin-top-left" />
        </div>
      </div>
      {focus && (
        <ul className="absolute flex mt-1 flex-col w-full border-2 border-slate-100 bg-white rounded-md">
          {options.map((v, i) => (
            <li key={i} className="p-2 cursor-pointer hover:bg-slate-100 text-left" onClick={() => onSelectItem(v)}>
              {v}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default DropDown;
