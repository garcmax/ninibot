'use strict'
var should = require("should");

import * as utils from "../src/utils/utils"
import {buildQuery} from "../src/command/multimedia"

describe('utils on string', function () {
  it('should trim of any non printable caracters', function (done) {
    var test = utils.trim("\bhello");
    test.length.should.be.equal(5);
    done();
  });
});


describe('test on imgur api', function () {
  it ('should recognize no options', function (done) {
    let message = {};
    message.content = "!imgur";
    let options = message.content.split(/\s/);
    should.exist(buildQuery(options));
    done();
  });
  it ('should recognize top options', function (done) {
    let message = {};
    message.content = "!imgur -top";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/top/?q=");
    done();
  });
  it ('should recognize top day options', function (done) {
    let message = {};
    message.content = "!imgur -top -day";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/top/day/?q=");
    done();
  });
  it ('should recognize top week options', function (done) {
    let message = {};
    message.content = "!imgur -top -week";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/top/week/?q=");
    done();
  });
  it ('should recognize top month options', function (done) {
    let message = {};
    message.content = "!imgur -top -month";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/top/month/?q=");
    done();
  });
  it ('should recognize top year options', function (done) {
    let message = {};
    message.content = "!imgur -top -year";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/top/year/?q=");
    done();
  });
  it ('should return url parameters for -top search', function (done) {
    let message = {};
    message.content = "!imgur -top search";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/top/?q=search ");
    done();
  });
  it ('should return url parameters for -top -day search', function (done) {
    let message = {};
    message.content = "!imgur -top -day search";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/top/day/?q=search ");
    done();
  });
  it ('should recognize viral options', function (done) {
    let message = {};
    message.content = "!imgur -viral";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/viral/?q=");
    done();
  });
  it ('should return url parameters for -viral search', function (done) {
    let message = {};
    message.content = "!imgur -viral search";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/viral/?q=search ");
    done();
  });
  it ('should return url parameters for search and destroy', function (done) {
    let message = {};
    message.content = "!imgur search and destroy";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("/?q=search and destroy ");
    done();
  });
  it ('should return help strings', function (done) {
    let message = {};
    message.content = "!imgur -help";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal(-1);
    done();
  });
});
