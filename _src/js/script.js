var banner = document.getElementById('banner');
var leftBlackEye = document.getElementById('leftBlackEye');
var leftWhiteEye = document.getElementById('leftWhiteEye');
var rightBlackEye = document.getElementById('rightBlackEye');
var rightWhiteEye = document.getElementById('rightWhiteEye');

banner.addEventListener('mouseenter', (e) => {
  banner.addEventListener('mousemove', mouseMove);
  banner.addEventListener('mouseleave', mouseLeave);
});

function mouseLeave(e) {
  banner.removeEventListener('mouseleave', mouseLeave);
  banner.removeEventListener('mousemove', mouseMove);
}

function mouseMove(e) {
  var bannerDimenstions = banner.getBoundingClientRect();
  var bannerWidth = bannerDimenstions.width;
  var bannerHeight = bannerDimenstions.height;

  var leftBlackEyeCX = 110 + (45 * e.pageX / bannerWidth);
  var leftWhiteEyeCX = 105 + (55 * e.pageX / bannerWidth);
  var rightBlackEyeCX = 230 + (45 * e.pageX / bannerWidth);
  var rightWhiteEyeCX = 225 + (55 * e.pageX / bannerWidth);

  var leftBlackEyeCY = 75 + (30 * e.pageY / bannerHeight);
  var leftWhiteEyeCY = 70 + (40 * e.pageY / bannerHeight);
  var rightBlackEyeCY = 75 + (30 * e.pageY / bannerHeight);
  var rightWhiteEyeCY = 70 + (40 * e.pageY / bannerHeight);

  leftBlackEye.style.cx = leftBlackEyeCX;
  leftWhiteEye.style.cx = leftWhiteEyeCX;
  rightBlackEye.style.cx = rightBlackEyeCX;
  rightWhiteEye.style.cx = rightWhiteEyeCX;

  leftBlackEye.style.cy = leftBlackEyeCY;
  leftWhiteEye.style.cy = leftWhiteEyeCY;
  rightBlackEye.style.cy = rightBlackEyeCY;
  rightWhiteEye.style.cy = rightWhiteEyeCY;
}