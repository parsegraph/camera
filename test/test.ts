const {assert} = require("chai");
import { containsAny, containsAll } from "../src/index";

describe("Camera", function () {
  it("containsAll", ()=>{
    assert.ok(containsAll(0, 0, 800, 600, 0, 0, 400, 200), "Small box in viewport");
    assert.ok(containsAll(0, 0, 800, 600, 0, 0, 900, 200), "Taller box in viewport");
    assert.ok(containsAll(0, 0, 800, 600, 0, 0, 400, 1000), "Wider box in viewport");
    assert.ok(containsAll(0, 0, 800, 600, 0, 0, 1000, 1000), "Larger box in viewport");
    assert.ok(containsAll(0, 0, 800, 600, 600, 0, 400, 200), "Small box on edge of viewport");
  });

  it("containsAny", ()=>{
    assert.ok(containsAny(0, 0, 800, 600, 0, 0, 400, 200), "Small box in viewport");
    assert.ok(containsAny(0, 0, 800, 600, 0, 0, 900, 200), "Taller box in viewport");
    assert.ok(containsAny(0, 0, 800, 600, 0, 0, 400, 1000), "Wider box in viewport");
    assert.ok(containsAny(0, 0, 800, 600, 0, 0, 1000, 1000), "Larger box in viewport");
    assert.ok(containsAny(0, 0, 800, 600, 600, 0, 400, 200), "Small box on edge of viewport");
  });
});
