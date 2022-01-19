import { useSwrLocal } from '@hooks/useSwrLocal';
import { DropdownOption } from '@utils/dropdownOptions';
import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import SelectBox from './SelectBox';
import Trigger from './Trigger';

interface DropdownProps {
  swrKey: string; // sort key
  options: DropdownOption[]; // src/utils/sortOptions.ts
  largeWidth?: boolean;
}

const Dropdown = ({ swrKey, options, largeWidth }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { data: dropdown, mutation: setDropdown } = useSwrLocal<DropdownOption>(swrKey);
  const toggleSort = useCallback(() => {
    setDropdownVisible(!isDropdownVisible);
  }, [setDropdownVisible, isDropdownVisible]);

  const onClickDropdown = (newDropdown: DropdownOption) => {
    toggleSort();
    if (dropdown?.title !== newDropdown.title) setDropdown(newDropdown); // 현재 선택된 정렬과 새로운 정렬이 다를 경우 새로운 정렬로 localSWR 값을 업데이트
  };

  useEffect(() => {
    const pageClickEvent = (e: MouseEventHandler) => {
      // @ts-ignore
      if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        toggleSort();
      }
    };
    if (isDropdownVisible) {
      // @ts-ignore
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      // @ts-ignore
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isDropdownVisible, toggleSort]);

  return (
    <SelectBox>
      <Trigger title={`${dropdown ? dropdown?.title : options && options[0]?.title} `} onClick={toggleSort} />
      {isDropdownVisible && <Menu list={options} ref={dropdownRef} onClick={onClickDropdown} largeWidth={!!largeWidth} />}
    </SelectBox>
  );
};

export default React.memo(Dropdown);
