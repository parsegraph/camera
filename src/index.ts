import containsAny from "./containsAny";
import containsAll from "./containsAll";
import Rect from "parsegraph-rect";

import {
  getVFlip,
  matrixMultiply3x3,
  makeTranslation3x3,
  makeScale3x3,
  make2DProjection,
  matrixTransform2D,
  makeInverse3x3,
  Matrix3x3,
} from "parsegraph-matrix";

export default class Camera {
  _cameraX: number;
  _cameraY: number;
  _scale: number;
  _width: number;
  _height: number;
  _aspectRatio: number;
  _changeVersion: number;
  _vflip: boolean;
  _worldMatrix: Matrix3x3;

  constructor() {
    this._cameraX = 0;
    this._cameraY = 0;
    this._scale = 1;

    this._width = NaN;
    this._height = NaN;
    this._aspectRatio = NaN;

    this._changeVersion = 0;

    this._vflip = getVFlip();
  }

  setSize(width: number, height: number): boolean {
    if (this._width === width && this._height === height) {
      return false;
    }
    if (!isNaN(this._width) && !isNaN(this._height)) {
      this.adjustOrigin(
        (width - this._width) / (2 * this._scale),
        (height - this._height) / (2 * this._scale)
      );
    }
    this._width = width;
    this._height = height;
    this._aspectRatio = this._width / this._height;
    this.hasChanged();
    return true;
  }

  transform(x: number, y:number): [number, number] {
    const mouseInWorld = matrixTransform2D(
      makeInverse3x3(this.worldMatrix()),
      x,
      y
    );
    return [mouseInWorld[0], mouseInWorld[1]];
  }

  zoomToPoint(scaleFactor: number, x: number, y: number): void {
    // Get the current mouse position, in world space.
    const mouseInWorld = this.transform(x, y);
    // console.log("mouseInWorld=" + mouseInWorld[0] + ", " + mouseInWorld[1]);

    // Adjust the scale.
    this.setScale(this.scale() * scaleFactor);

    // Get the new mouse position, in world space.
    const mouseAdjustment = matrixTransform2D(
      makeInverse3x3(this.worldMatrix()),
      x,
      y
    );
    // console.log(
    //   "mouseAdjustment=" +
    //   mouseAdjustment[0] +
    //   ", " +
    //   mouseAdjustment[1]);

    // Adjust the origin by the movement of the fixed point.
    this.adjustOrigin(
      mouseAdjustment[0] - mouseInWorld[0],
      mouseAdjustment[1] - mouseInWorld[1]
    );
  }

  setOrigin(x: number, y: number): void {
    if (x == this._cameraX && y == this._cameraY) {
      return;
    }
    this._cameraX = x;
    this._cameraY = y;
    this.hasChanged();
  }

  changeVersion(): number {
    return this._changeVersion;
  }

  hasChanged(): void {
    ++this._changeVersion;
    this._worldMatrix = null;
  }

  toJSON(): any {
    return {
      cameraX: this._cameraX,
      cameraY: this._cameraY,
      scale: this._scale,
      width: this._width,
      height: this._height,
    };
  }

  restore(json: any): void {
    this.setOrigin(json.cameraX, json.cameraY);
    this.setScale(json.scale);
  }

  copy(other: Camera): void {
    this.setSize(other.width(), other.height());
    this.setOrigin(other.x(), other.y());
    this.setScale(other.scale());
  }

  scale() {
    return this._scale;
  }

  x() {
    return this._cameraX;
  }

  y() {
    return this._cameraY;
  }

  setScale(scale: number) {
    this._scale = scale;
    this.hasChanged();
  }

  toString() {
    return (
      "(" + this._cameraX + ", " + this._cameraY + ", " + this._scale + ")"
    );
  }

  adjustOrigin(x: number, y: number) {
    if (x == 0 && y == 0) {
      return;
    }
    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw new Error(
        "Adjusted origin must not be null. (Given " + x + ", " + y + ")"
      );
    }
    this._cameraX += x;
    this._cameraY += y;
    this.hasChanged();
  }

  worldMatrix(): Matrix3x3 {
    return matrixMultiply3x3(
      makeTranslation3x3(this.x(), this.y()),
      makeScale3x3(this.scale(), this.scale())
    );
  }

  aspectRatio() {
    return this._aspectRatio;
  }

  width() {
    return this._width;
  }

  height() {
    return this._height;
  }

  canProject(): boolean {
    return !Number.isNaN(this._width) && !Number.isNaN(this._height);
  }

  projectionMatrix(): Matrix3x3 {
    if (!this.canProject()) {
      throw new Error(
        "Camera cannot create a projection matrix because the " +
          "target canvas has no size. Use canProject() to handle."
      );
    }

    return make2DProjection(this._width, this._height);
  }

  project(): Matrix3x3 {
    if (!this._worldMatrix || getVFlip() !== this._vflip) {
      this._vflip = getVFlip();
      this._worldMatrix = matrixMultiply3x3(
        this.worldMatrix(),
        this.projectionMatrix()
      );
    }
    return this._worldMatrix;
  }

  containsAny(s: Rect): boolean {
    if (s.isNaN()) {
      return false;
    }
    const viewportX = -this.x() + this.width() / (this.scale() * 2);
    if (s.x() - s.width() / 2 > viewportX + this.width() / this.scale() / 2) {
      return false;
    }
    if (s.x() + s.width() / 2 < viewportX - this.width() / this.scale() / 2) {
      return false;
    }
    const viewportY = -this.y() + this.height() / (this.scale() * 2);
    if (s.y() - s.height() / 2 > viewportY + this.height() / this.scale() / 2) {
      return false;
    }
    if (s.y() + s.height() / 2 < viewportY - this.height() / this.scale() / 2) {
      return false;
    }
    return true;
  }

  containsAll(s: Rect): boolean {
    if (s.isNaN()) {
      return false;
    }
    const camera = this;
    return containsAll(
      -camera.x() + camera.width() / (camera.scale() * 2),
      -camera.y() + camera.height() / (camera.scale() * 2),
      camera.width() / camera.scale(),
      camera.height() / camera.scale(),
      s.x(),
      s.y(),
      s.width(),
      s.height()
    );
  }
}

export { containsAny, containsAll };
