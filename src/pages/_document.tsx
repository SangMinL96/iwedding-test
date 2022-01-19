import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      if (process.env.NODE_ENV === 'production') {
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: App => props =>
              sheet.collectStyles(() =>
                renderToString(
                  <StyleSheetManager sheet={sheet.instance}>
                    <App {...props} />
                  </StyleSheetManager>,
                ),
              ),
          });
      } else {
        // eslint-disable-next-line react/display-name
        ctx.renderPage = () => originalRenderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) });
      }
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.log(`error rendering _document`, error);
    } finally {
      sheet.seal();
    }
  }
  redirectIEToEdge = () => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `if(navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)) {
          window.location = 'microsoft-edge:' + 'https://www.iwedding.co.kr/main/index';
        }`,
        }}
      ></script>
    );
  };
  facebookPixel = () => {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: ` !(function (f, b, e, v, n, t, s) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1754076628217951'); // Insert your pixel ID here.
        fbq('track', 'PageView');`,
          }}
        ></script>
        <noscript>
          <img
            height='1'
            width='1'
            style={{ display: 'none' }}
            src='https://www.facebook.com/tr?id=1754076628217951&ev=PageView&noscript=1'
          />
        </noscript>
      </>
    );
  };
  aceCounter = () => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `var _AceGID = (function () {
        var Inf = ['gtb13.acecounter.com', '8080', 'HB5O36588847412', 'AW', '0', 'NaPm,Ncisy', 'ALL', '0'];
        var _CI = !_AceGID ? [] : _AceGID.val;
        var _N = 0;
        var _T = new Image(0, 0);
        if (_CI.join('.').indexOf(Inf[3]) < 0) {
          _T.src = (location.protocol == 'https:' ? 'https://' + Inf[0] : 'http://' + Inf[0] + ':' + Inf[1]) + '/?cookie';
          _CI.push(Inf);
          _N = _CI.length;
        }
        return { o: _N, val: _CI };
      })();
      var _AceCounter = (function () {
        var G = _AceGID;
        var _sc = document.createElement('script');
        var _sm = document.getElementsByTagName('script')[0];
        if (G.o != 0) {
          var _A = G.val[G.o - 1];
          var _G = _A[0].substr(0, _A[0].indexOf('.'));
          var _C = _A[7] != '0' ? _A[2] : _A[3];
          var _U = _A[5].replace(/\,/g, '_');
          _sc.src =
            (location.protocol.indexOf('http') == 0 ? location.protocol : 'http:') +
            '//cr.acecounter.com/Web/AceCounter_' +
            _C +
            '.js?gc=' +
            _A[2] +
            '&py=' +
            _A[4] +
            '&gd=' +
            _G +
            '&gp=' +
            _A[1] +
            '&up=' +
            _U +
            '&rd=' +
            new Date().getTime();
          _sm.parentNode.insertBefore(_sc, _sm);
          return _sc.src;
        }
      })();`,
        }}
      ></script>
    );
  };
  render() {
    return (
      <Html>
        <Head />
        {this.redirectIEToEdge()}
        {this.facebookPixel()}
        <body>
          <Main />
          <div id='modal-root'></div>
          <NextScript />
          <script src='https://pay.kcp.co.kr/plugin/payplus_web.jsp' />
          <script src='https://developers.kakao.com/sdk/js/kakao.min.js' />
          {this.aceCounter()}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
