const toHHMMSS = seconds => {
  let h,
    m,
    s,
    result = '';

  // hours
  h = Math.floor(seconds / 3600);
  seconds -= h * 3600;
  if (h) {
    result = h + ':';
  }

  // minutes
  m = Math.floor(seconds / 60);
  result += m < 10 && h > 0 ? '0' + m + ':' : m + ':';

  // seconds
  s = Math.floor(seconds % 60);
  result += s < 10 ? '0' + s : s;
  return result;
};

const offset = elem => {
  if (!elem) elem = this;

  var x = elem.offsetLeft;
  var y = elem.offsetTop;

  while ((elem = elem.offsetParent)) {
    x += elem.offsetLeft;
    y += elem.offsetTop;
  }

  return { left: x, top: y };
};

const debounce = (func, delay = 200) => {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
};
