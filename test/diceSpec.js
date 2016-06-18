'use strict'
var should = require("should");
var sinon = require("sinon");
var random = require("random-js");

import {throwDice} from "../src/command/dice"

describe ('recognizing dice', function () {
  it('should throw a d2', function (done) {
    let message = {"content" : "!dice d2"};
    let options = message.content.split(/\s/);
    let result = throwDice(options);
    (result <= 2).should.be.true();
    done();
  });
  it('should throw a d20 with shortcut', function (done) {
    let message = {"content" : "!d20"};
    let options = message.content.split(/\s/);
    let result = throwDice(options);
    (result <= 20).should.be.true();
    done();
  });
  it('should throw an error with shortcut', function (done) {
    let message = {"content" : "!d21"};
    let options = message.content.split(/\s/);
    let result = throwDice(options);
    (result == 1).should.be.true();
    done();
  });
});

describe('recognizing dice mocked', function() {
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

  it('should throw a d2', function (done) {
    let message = {"content" : "!dice d2"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d4', function (done) {
    let message = {"content" : "!dice d4"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d6', function (done) {
    let message = {"content" : "!dice d6"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d8', function (done) {
    let message = {"content" : "!dice d8"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d10', function (done) {
    let message = {"content" : "!dice d10"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d12', function (done) {
    let message = {"content" : "!dice d12"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d20', function (done) {
    let message = {"content" : "!dice d20"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d100', function (done) {
    let message = {"content" : "!dice d100"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should throw a d100 by shortcut', function (done) {
    let message = {"content" : "!d100"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(4);
    done();
  });
  it('should fail and return 1', function (done) {
    let message = {"content" : "!dice d13"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(1);
    done();
  });
  it('should fail and return 1 with shortcut', function (done) {
    let message = {"content" : "!d13 toto"};
    let options = message.content.split(/\s/);
    throwDice(options).should.be.equal(1);
    done();
  });
});
