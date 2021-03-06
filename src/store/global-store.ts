import { useRef, useState } from 'react';
import { createContainer } from 'unstated-next';

const useGlobal = () => {
  const [visible, setVisible] = useState(false);
  const [masking, setMasking] = useState<MaskingType>({
    xpos: 0,
    ypos: 0,
    show: false,
    maskingText: '',
    maskingStart: 0,
    maskingEnd: 0,
  });

  const moveUrl = useRef('');

  const toogleVisible = (value?: boolean) => {
    setVisible((p) => value ?? !p);
  };
  const onCancel = () => {
    setVisible(false);
  };

  const handleMasking = ({ maskingEnd, maskingStart, maskingText, show, xpos, ypos }: MaskingType) => {
    setMasking({ xpos, ypos, show, maskingText, maskingStart, maskingEnd });
  };

  return {
    visible,
    masking,
    moveUrl,
    onCancel,
    toogleVisible,
    handleMasking,
  };
};

const GlobalStore = createContainer(useGlobal);

export default GlobalStore;
