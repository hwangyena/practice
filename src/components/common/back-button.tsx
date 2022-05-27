import React from 'react';
import BackArrow from 'public/images/back-arrow.svg';
import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="fixed top-5 left-5 cursor-pointer" onClick={() => router.back()}>
      <BackArrow className="h-6 w-6" />
    </div>
  );
};

export default BackButton;
