const ua = window.navigator.userAgent;
const isIOS = ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const isWechat = ua.indexOf('MicroMessenger') > -1;
const isAndroid = ua.match(/(Android)\s+([\d.]+)/);
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const isMobile = !!isIOS || !!isAndroid || !!ipad;

const setTitle = (title) => {
  document.title = title;
  if (isMobile) {
    const iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    const iframeCallback = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 10);
    };
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe);
  }
};

export default {
  isIOS,
  isWechat,
  isMobile,
  setTitle,
};
