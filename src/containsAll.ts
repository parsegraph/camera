export default function containsAll(
  viewportX,
  viewportY,
  viewWidth,
  viewHeight,
  cx,
  cy,
  width,
  height
) {
  const viewHalfWidth = viewWidth / 2;
  const viewHalfHeight = viewHeight / 2;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  if (cx + halfWidth > viewportX + viewHalfWidth) {
    return false;
  }
  if (cx - halfWidth < viewportX - viewHalfWidth) {
    return false;
  }
  if (cy + halfHeight > viewportY + viewHalfHeight) {
    return false;
  }
  if (cy - halfHeight < viewportY - viewHalfHeight) {
    return false;
  }
  return true;
}
