'use strict'
var should = require("should");

import {dice} from "../src/command/dice"

describe('recognizing dice', function() {
  it('should be a d6', function (done) {
    let bot = {};
    let message = {"content" : "!dice d6"};
    let options = message.content.split(/\s/);
    dice(bot, message, options).should.be.equal("d6");
    done();
  });
  it('should be a d100', function (done) {
    let bot = {};
    let message = {"content" : "!dice d100"};
    let options = message.content.split(/\s/);
    dice(bot, message, options).should.be.equal("d100");
    done();
  });
});
