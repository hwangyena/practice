import { ReactNode } from 'react';
import { CloseButton } from '.';
import styles from 'src/styles/custom.module.css';

type Props = {
  title?: string;
  children: ReactNode;
  visible: boolean;
  onCancel: () => void;
  closeable?: boolean;
  footer?: ReactNode;
};

const PopUp = ({ children, title, onCancel, visible, closeable = true, footer }: Props) => {
  return visible ? (
    <div className={styles.popup}>
      <div className={styles['popup-back']} onClick={onCancel} />
      <div className={styles['popup-container']}>
        <div className="p-10">
          {title && <h2 className=" mb-5 text-center">{title}</h2>}
          {closeable && <CloseButton onClose={onCancel} />}
          {children}
        </div>
        {footer}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PopUp;
