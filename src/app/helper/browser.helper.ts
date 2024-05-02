export function isIE() {
  const userAgent = window?.navigator?.userAgent;

  if (userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1) {
    return true;
  }

  return false;
}

export function isIframe() {
  // if (typeof window == 'undefined') {
  //   return;
  // }

  return window !== window?.parent && !window?.opener;

}