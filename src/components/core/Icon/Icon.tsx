import React from 'react';

import leftArrowSvg from '@styles/icons/leftArrow.svg';
import rightArrowSvg from '@styles/icons/rightArrow.svg';
import rightArrowBlackSvg from '@styles/icons/rightArrowBlack.svg';
import rangkingSvg from '@styles/icons/ranking.svg';
import slideLeftSvg from '@styles/icons/slideLeft.svg';
import slideRightSvg from '@styles/icons/slideRight.svg';

type IconType = {
  name: string;
};

const iconMap: any = {
  leftArrow: leftArrowSvg,
  rightArrow: rightArrowSvg,
  rightArrowBlack: rightArrowBlackSvg,
  ranking: rangkingSvg,
  slideLeft: slideLeftSvg,
  slideRight: slideRightSvg,
};

const Icon = ({ name }: IconType) => {
  const SvgIcon = iconMap[name];
  return (
    <div>
      <SvgIcon />
    </div>
  );
};

export default Icon;
