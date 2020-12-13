export default function containsAny(
    viewportX,
    viewportY,
    viewWidth,
    viewHeight,
    cx,
    cy,
    width,
    height,
) {
  const viewHalfWidth = viewWidth / 2;
  const viewHalfHeight = viewHeight / 2;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  /* function dump() {
        console.log("viewportX=" + viewportX);
        console.log("viewportY=" + viewportY);
        console.log("viewWidth=" + viewWidth);
        console.log("viewHeight=" + viewHeight);
        console.log("cx=" + cx);
        console.log("cy=" + cy);
        console.log("width=" + width);
        console.log("height=" + height);
    };*/

  if (cx - halfWidth > viewportX + viewHalfWidth) {
    // console.log(1);
    // dump();
    return false;
  }
  if (cx + halfWidth < viewportX - viewHalfWidth) {
    // console.log(2);
    // dump();
    return false;
  }
  if (cy - halfHeight > viewportY + viewHalfHeight) {
    // console.log("Viewport min is greater than given's max");
    // dump();
    return false;
  }
  if (cy + halfHeight < viewportY - viewHalfHeight) {
    // console.log("Viewport does not contain any: given vmax' +
    //   ' is less than viewport's vmin");
    // dump();
    return false;
  }
  return true;
}

