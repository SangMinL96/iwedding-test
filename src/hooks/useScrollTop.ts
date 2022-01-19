const ScrollToTop = ({ children }: any) => {
  if (typeof window !== 'undefined') {
    global.window?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }

  return children || null;
};

export default ScrollToTop;
