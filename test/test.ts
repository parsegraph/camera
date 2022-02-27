const { assert } = require("chai");
import Camera, { containsAny, containsAll } from "../src/index";

describe("Camera", function () {
  it("constructed", () => {
    const cam = new Camera();
    cam.setSize(800, 600);
    assert.ok(cam.project());
  });

  it("needs size to project", () => {
    const cam = new Camera();
    assert.isFalse(cam.canProject());
    cam.setSize(800, 600);
    assert.isTrue(cam.canProject());
  });

  it("project will throw without size", () => {
    const cam = new Camera();
    assert.isFalse(cam.canProject());
    assert.throws(() => cam.project());
  });

  it("containsAll", () => {
    assert.ok(
      containsAll(0, 0, 800, 600, 0, 0, 400, 200),
      "Small box in viewport"
    );
    assert.isFalse(
      containsAll(0, 0, 800, 600, 0, 0, 900, 200),
      "Taller box partially outside viewport"
    );
    assert.isFalse(
      containsAll(0, 0, 800, 600, 0, 0, 400, 1000),
      "Wider box partially outside viewport"
    );
    assert.isFalse(
      containsAll(0, 0, 800, 600, 0, 0, 1000, 1000),
      "Larger box outside viewport"
    );
    assert.isFalse(
      containsAll(0, 0, 800, 600, 600, 0, 400, 200),
      "Small box on edge of viewport"
    );
  });

  it("containsAny", () => {
    assert.ok(
      containsAny(0, 0, 800, 600, 0, 0, 400, 200),
      "Small box in viewport"
    );
    assert.ok(
      containsAny(0, 0, 800, 600, 0, 0, 900, 200),
      "Taller box in viewport"
    );
    assert.ok(
      containsAny(0, 0, 800, 600, 0, 0, 400, 1000),
      "Wider box in viewport"
    );
    assert.ok(
      containsAny(0, 0, 800, 600, 0, 0, 1000, 1000),
      "Larger box in viewport"
    );
    assert.ok(
      containsAny(0, 0, 800, 600, 600, 0, 400, 200),
      "Small box on edge of viewport"
    );
    assert.isFalse(
      containsAny(0, 0, 800, 600, 900, 0, 400, 200),
      "Small box in viewport"
    );
    assert.isFalse(
      containsAny(0, 0, 800, 600, 0, 700, 400, 200),
      "Small box in viewport"
    );
  });
});
