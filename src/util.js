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

/**
 * role name to hex color code.
 * @param {string} role
 */
export function roleToColor(role) {
  switch (role) {
    case 'dps':
      return '#832528';
    case 'tank':
      return '#3C4FD8';
    case 'healer':
      return '#318413';
    default:
      return '#343434';
  }
}

/**
 * scale up (*1.3)
 * @param {*} scale
 * @param {*} maxScale
 */
export function upScale(scale, maxScale) {
  return Math.min(maxScale, scale * 1.3);
}

/**
 * scale down (/1.3)
 * @param {*} scale
 * @param {*} minScale
 */
export function downScale(scale, minScale) {
  return Math.max(minScale, scale / 1.3);
}
