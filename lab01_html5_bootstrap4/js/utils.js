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

const SUBTITLES = [
  `1
00:00:00,322 --> 00:00:02,353
These Angular docs help you learn and use the Angular platform and framework

2
00:00:03,998 --> 00:00:06,059
from your first app to optimizing complex enterprise apps.

3
00:00:06,925 --> 00:00:09,361
Tutorials and guides include downloadable example to accelerate your projects.

4
00:00:10,921 --> 00:00:12,635
These docs assume that you are already familiar with HTML, CSS, JavaScript,

5
00:00:15,620 --> 00:00:16,785
and some of the tools from the latest standards, such as classes and modules.`,

  `1
00:00:00,322 --> 00:00:03,353
Getting Started with Angular: Your First App

2
00:00:03,998 --> 00:00:06,059
This tutorial introduces you to the essentials of Angular.

3
00:00:06,925 --> 00:00:09,361
It leverages what you already know about HTML and JavaScript

4
00:00:10,921 --> 00:00:12,635
plus some useful Angular features

5
00:00:13,620 --> 00:00:16,785
to build a simple online store application, with a catalog, shopping cart, and check-out form.`
];
