'use strict';
import hw from '../src/scripts/helloworld';

describe('hello world', function () {
  it('should return hello world', function (done) {
    hw().should.equal("hello world");
    done();
  });
});
