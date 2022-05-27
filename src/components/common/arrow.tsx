import React, { memo } from 'react';
import cn from 'classnames';

type Props = {
  type: 'back' | 'forward' | 'double-back' | 'double-forward';
  active: boolean;
  onClick?: () => void;
};

const CustomArrow = ({ active, type, onClick }: Props) => {
  const ARROW_BACK = type === 'back';
  const ARROW_FORWARD = type === 'forward';
  const DOUBLE_ARROW_BACK = type === 'double-back';
  const DOUBLE_ARROW_FORWARD = type === 'double-forward';

  const color = active ? '#777' : '#ccc';
  return (
    <div className={cn({ 'cursor-pointer': active })} onClick={onClick}>
      {ARROW_BACK && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      )}
      {ARROW_FORWARD && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
      {DOUBLE_ARROW_BACK && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      )}
      {DOUBLE_ARROW_FORWARD && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
};

export default memo(CustomArrow);
// export default CustomArrow;
