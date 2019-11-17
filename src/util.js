/**
 * Copy text to Clipboard.
 * @param {string} text
 */
export function copyToClipboard(text) {
  const dummyElm = document.createElement('textarea');
  dummyElm.textContent = text;

  const bodyElm = document.getElementsByTagName('body')[0];
  bodyElm.appendChild(dummyElm);

  dummyElm.select();

  const copyResult = document.execCommand('copy');

  bodyElm.removeChild(dummyElm);

  return copyResult;
}

export default {
  copyToClipboard,
};
