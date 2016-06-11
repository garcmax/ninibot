'use strict'

describe('my first test', function () {
  it('shoud be true', function (done) {
    let boolean = true;
    boolean.should.be.true();
    done();
  });
});
