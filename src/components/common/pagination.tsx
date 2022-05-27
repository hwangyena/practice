import { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from 'src/styles/custom.module.css';
import CustomArrow from './arrow';

type Props = {
  currentPage?: number; // default 1
  total: number; // total 페이지 수
  onPageChange: (page: number) => void;
};

export const PAGE_LIST_PER_ONCE = 10;

const Pagination = ({ total, currentPage, onPageChange }: Props) => {
  const isArrow = total > PAGE_LIST_PER_ONCE;
  const [current, setCurrent] = useState(1);

  /** 현재 페이지 위치하는 곳에서 페이지 수 */
  const getPageGroup = () => {
    let currentPageGrp = Math.floor(current / PAGE_LIST_PER_ONCE); // 현재 페이지 그룹 위치
    if (current % PAGE_LIST_PER_ONCE === 0) {
      currentPageGrp -= 1;
    }

    const page: number[] = [];

    for (let i = 1; i <= PAGE_LIST_PER_ONCE; i += 1) {
      const pageNo = currentPageGrp * PAGE_LIST_PER_ONCE + i;
      if (pageNo > total) break;
      page.push(pageNo);
    }

    return page;
  };

  /** 페이지 선택 */
  const handlePageClick = (page: number) => {
    if (page === current) {
      return;
    }

    setCurrent(page);
    onPageChange(page);
  };

  /** 한 페이지 이동 */
  const handlePrevNextClicked = (moved: -1 | 1) => {
    const targetGrp = getPageGroup();

    let targetPageNo = (moved === 1 ? targetGrp[targetGrp.length - 1] : targetGrp[0]) + moved;

    if (targetPageNo < 1) {
      targetPageNo = 1;
    }
    if (targetPageNo > total) {
      targetPageNo = total;
    }

    if (targetPageNo === current) {
      return;
    }

    setCurrent(targetPageNo);
    onPageChange(targetPageNo);
  };

  useEffect(() => {
    currentPage && setCurrent(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.pagination}>
      {isArrow && (
        <>
          <CustomArrow onClick={() => current !== 1 && handlePageClick(1)} active={current !== 1} type="double-back" />
          <CustomArrow onClick={() => handlePrevNextClicked(-1)} active={current !== 1} type="back" />
        </>
      )}
      {getPageGroup().map((v) => (
        <a key={v} className={cn({ [styles.selected]: v === current })} onClick={() => handlePageClick(v)}>
          <span>{v}</span>
        </a>
      ))}
      {isArrow && (
        <>
          <CustomArrow onClick={() => handlePrevNextClicked(1)} active={current !== total} type="forward" />
          <CustomArrow
            onClick={() => current !== total && handlePageClick(total)}
            active={current !== total}
            type="double-forward"
          />
        </>
      )}
    </div>
  );
};

export default memo(Pagination);
