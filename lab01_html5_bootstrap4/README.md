# Html5 Media Player

### Tech stack

1. Vanilla JavaScript(ES6), no any other JS Library
2. HTML5(video, progress)
3. CSS3
4. Fontawesome 5

### Setup

```sh
npm i -g gulp-server-livereload  # optional
git clone https://github.com/uniquejava/FSD.git
cd lab01xxx
livereload  # recommended
Open index.html directly in Chrome browser # not recommended
```

### Fullscreen notes

1.  requestFullControl 必须加在 video 的 parent tag 而非 video 上.
2.  exitFullscreen 是加在 document 上.
3.  浏览器会将全屏的 element 放在 document.fullscreenElement 中，通过判断它的值来决定当前是否为全屏模式.

### Credits

1. sample videos: https://www.sample-videos.com/
2. livereload server: https://github.com/hiddentao/gulp-server-livereload
3. prettier

### References

1. [Having custom controls still apply when go fullscreen on a HTML5 video?](https://stackoverflow.com/questions/10115345/having-custom-controls-still-apply-when-go-fullscreen-on-a-html5-video)
2. [Html5 Full screen video](https://stackoverflow.com/questions/6039909/html5-full-screen-video)
3. [How to display custom video controls even in fullscreen](https://stackoverflow.com/questions/38134629/how-to-display-custom-video-controls-even-in-fullscreen)
