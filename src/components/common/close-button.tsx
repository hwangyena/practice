import { memo, MouseEventHandler } from 'react';
import styles from '../../styles/custom.module.css';

type Props = {
  onClose: MouseEventHandler;
};

const CloseButton = ({ onClose }: Props) => {
  return (
    <div className={styles['close-button']} onClick={onClose}>
      <span />
      <span />
    </div>
  );
};

export default memo(CloseButton);
