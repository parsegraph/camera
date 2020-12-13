var assert = require("assert");
import todo from "../dist/camera";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});
