export const openWeb = URL => {
  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    },
  };
  try {
    if (isMobile.Android()) {
      iWeddingApp.openWeb(URL);
    } else if (isMobile.iOS()) {
      webkit.messageHandlers.scriptHandler.postMessage({
        action: 'openWeb',
        URL: URL,
      });
    }
  } catch (e) {
    alert(e.messages);
    alert('Method Call Failed');
  }
};

export const openKakaoLink = URL => {
  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    },
  };
  try {
    if (isMobile.Android()) {
      iWeddingApp.openWeb(URL);
    } else if (isMobile.iOS()) {
      webkit.messageHandlers.scriptHandler.postMessage({
        action: 'shareContents',
        URL: URL,
      });
    }
  } catch (e) {
    alert(e.messages);
    alert('Method Call Failed');
  }
};
