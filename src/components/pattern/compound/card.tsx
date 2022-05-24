import { createContext, FC, ReactNode, useContext, useState } from 'react';

const LIMIT = 3;

interface ICardComposition {
  CardList: FC;
  CardButton: FC;
}

interface ICardContext {
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

/** context API */
const CardContext = createContext<ICardContext>({ isCollapsed: false, onToggleCollapsed: () => {} });

/** 전체 카드 */
const Card: FC & ICardComposition = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onToggleCollapsed = () => {
    setIsCollapsed((p) => !p);
  };

  const value = { isCollapsed, onToggleCollapsed };

  return (
    <CardContext.Provider value={value}>
      <div className="m-5">{children}</div>
    </CardContext.Provider>
  );
};

/** 카드 리스트 */
const CardList: FC = ({ children }) => {
  const { isCollapsed } = useContext(CardContext);

  if (!children) return <></>;
  return isCollapsed ? (
    <ul className="flex flex-col shadow-lg w-[150px] p-5 gap-5 bg-slate-300">
      {(children as ReactNode[]).slice(0, LIMIT)}
    </ul>
  ) : (
    <ul className="flex flex-col shadow-lg w-[150px] p-5 gap-5 bg-slate-300">{children}</ul>
  );
};

/** 카드 버튼 */
const CardButton = () => {
  const { onToggleCollapsed, isCollapsed } = useContext(CardContext);

  return (
    <button className="bg-slate-600 text-white mt-5" onClick={onToggleCollapsed}>
      {isCollapsed ? '펼치기' : '닫기'}
    </button>
  );
};

Card.CardList = CardList;
Card.CardButton = CardButton;

export default Card;
