'use strict'
var should = require("should");
var sinon = require("sinon");
var random = require("random-js");

import {dice} from "../src/command/dice"

describe('recognizing dice', function() {
  beforeEach(function() {
    sinon.stub(random, "integer").returns(
      function(engine) {
        return 4;
      }
    );
  });

  afterEach(function() {
    random.integer.restore();
  });

  it('should be a d6', function (done) {
    let bot = {};
    let message = {"content" : "!dice d6"};
    let options = message.content.split(/\s/);
    dice(bot, message, options).should.be.equal(4);
    done();
  });
  it('should be a d100', function (done) {
    let bot = {};
    let message = {"content" : "!dice d100"};
    let options = message.content.split(/\s/);
    dice(bot, message, options).should.be.equal(4);
    done();
  });
});
