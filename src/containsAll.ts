export default function containsAll(
  viewportX: number,
  viewportY: number,
  viewWidth: number,
  viewHeight: number,
  cx: number,
  cy: number,
  width: number,
  height: number
): boolean {
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
