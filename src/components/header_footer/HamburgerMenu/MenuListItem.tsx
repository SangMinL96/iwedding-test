import ArrowDown from '@images/common/chevron_down_gray_x3.png';
import ArrowUp from '@images/common/chevron_up_x3.png';
import { useMainCategory } from '@modules/ibrandplus/ibrandplusAPI';
import { CategoryProps } from '@modules/sharedData';
import theme from '@styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onToggle: any;
  item: any;
  active: boolean;
  closeMenu?: () => void;
}

const MenuListItem = ({ item, active, onToggle, closeMenu }: Props) => {
  const { data: categoryList } = useMainCategory(item.categoryKey);
  // console.log(categoryList);
  return (
    <Container>
      <div className='menu_title' onClick={onToggle}>
        <p>{item.title}</p>
        {active ? (
          <Arrow>
            <Image src={ArrowUp} alt='down_arrow' />
          </Arrow>
        ) : (
          <Arrow>
            <Image src={ArrowDown} alt='down_arrow' />
          </Arrow>
        )}
      </div>
      <div className={active ? 'contents active' : 'contents'}>
        {/* 추후 추가예정 */}
        {/* <Link href={`${item.categoryKey}_react`} passHref key={item.categoryKey + '_'}>
          <span>{item.title}홈</span>
        </Link> */}
        {item.title === '이벤트' || item.title === '콘텐츠' ? (
          <Link href={`/${item.categoryKey}?category=전체&subCategory=전체&tag=&page=1&keyword=`} passHref>
            <span onClick={closeMenu}>전체</span>
          </Link>
        ) : null}
        {categoryList?.map((li: CategoryProps) => (
          <Link
            href={`/${item.categoryKey}?category=${li.category}&subCategory=전체&tag=&page=1&keyword=`}
            passHref
            key={item.categoryKey + '_' + li.category}
          >
            <span onClick={closeMenu}>{li.displayName}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default MenuListItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  .menu_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 46px;
    > p {
      font-size: 16px;
      font-weight: 700;
      color: ${theme.black};
    }
  }
  .contents {
    width: 100%;
    max-height: 0;
    background-color: #f8f8f8;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    > span {
      display: flex;
      align-items: center;
      width: 100%;
      height: 28px;
      padding-left: 14px;
      font-size: 14px;
      color: #777777;
    }
  }
  .contents.active {
    height: auto;
    max-height: 350px;
    transition: max-height 0.2s ease-out;
    padding: 14px 0;
  }
`;
const Arrow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
