var assert = require("assert");
import Camera, {containsAny, containsAll} from "../dist/camera";

import TestSuite from 'parsegraph-testsuite';


describe("Camera", function () {
  it("works", ()=>{
    const cameraTests = new TestSuite('Camera');

    cameraTests.addTest('containsAll', function() {
      if (!containsAll(0, 0, 800, 600, 0, 0, 400, 200)) {
        return 'Small box in viewport';
      }

      if (containsAll(0, 0, 800, 600, 0, 0, 900, 200)) {
        return 'Taller box in viewport';
      }

      if (containsAll(0, 0, 800, 600, 0, 0, 400, 1000)) {
        return 'Wider box in viewport';
      }

      if (containsAll(0, 0, 800, 600, 0, 0, 1000, 1000)) {
        return 'Larger box in viewport';
      }

      if (containsAll(0, 0, 800, 600, 600, 0, 400, 200)) {
        return 'Small box on edge of viewport';
      }
    });

    cameraTests.addTest('containsAny', function() {
      if (!containsAny(0, 0, 800, 600, 0, 0, 400, 200)) {
        return 'Small box in viewport';
      }

      if (!containsAny(0, 0, 800, 600, 0, 0, 900, 200)) {
        return 'Taller box in viewport';
      }

      if (!containsAny(0, 0, 800, 600, 0, 0, 400, 1000)) {
        return 'Wider box in viewport';
      }

      if (!containsAny(0, 0, 800, 600, 0, 0, 1000, 1000)) {
        return 'Larger box in viewport';
      }

      if (!containsAny(0, 0, 800, 600, 600, 0, 400, 200)) {
        return 'Small box on edge of viewport';
      }
    });

    const result = cameraTests.run();
    assert.ok(result.isSuccessful());
  });
});
