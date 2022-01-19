import theme from '@styles/theme';
import { useMediaQuery } from 'react-responsive';

export const Desktop = () => {
  return useMediaQuery({ minWidth: theme.pc });
};

export const Tablet = () => {
  return useMediaQuery({ minWidth: theme.tablet, maxWidth: 991 });
};

export const Mobile = () => {
  return useMediaQuery({ maxWidth: 767 });
};

export const SmallMobile = () => {
  return useMediaQuery({ maxWidth: 374 });
};
