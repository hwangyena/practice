import { MouseEvent } from 'react';
import { transPassengerLabelToKor } from '../../lib/function/tranform';
import { CloseButton } from '../common';

type Props = {
  passenger: PassengerType;
  handleClick: (e: MouseEvent<Element>, index: number) => void;
};

/** 상세 정보 팝업 */
const PassengerDetailPopup = ({ passenger, handleClick }: Props) => {
  const airline = passenger.airline[0];

  return (
    <aside className="border-gray-100 border-4 absolute ml-3 p-3 rounded-md cursor-default">
      <CloseButton onClose={(e) => handleClick(e, -1)} />
      <ul>
        <li className="flex">
          <span className="w-20 font-bold">탑승자</span>
          <span>{passenger.name}</span>
        </li>
        {Object.keys(airline)
          .filter((v) => v !== 'logo')
          .filter((v) => v !== 'head_quaters')
          .map((v) => (
            <li key={v} className="flex">
              <span className="w-20 font-bold">{transPassengerLabelToKor(v)}</span>
              <span>{airline[v as keyof AirlineType]}</span>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default PassengerDetailPopup;
