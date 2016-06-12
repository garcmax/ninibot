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
  it ('should recognize bad option', function (done) {
    let message = {};
    message.content = "!imgur -bad";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("bad opt");
    done();
  });
  it ('should recognize top options', function (done) {
    let message = {};
    message.content = "!imgur -top";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=top&query=");
    done();
  });
  it ('should recognize viral options', function (done) {
    let message = {};
    message.content = "!imgur -viral";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=viral&query=");
    done();
  });
  it ('should recognize top day options', function (done) {
    let message = {};
    message.content = "!imgur -top -day";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=top&window=day&query=");
    done();
  });
  it ('should recognize top week options', function (done) {
    let message = {};
    message.content = "!imgur -top -week";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=top&window=week&query=");
    done();
  });
  it ('should recognize top month options', function (done) {
    let message = {};
    message.content = "!imgur -top -month";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=top&window=month&query=");
    done();
  });
  it ('should recognize top year options', function (done) {
    let message = {};
    message.content = "!imgur -top -year";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=top&window=year&query=");
    done();
  });
  it ('should recognize bad window options', function (done) {
    let message = {};
    message.content = "!imgur -top -bad";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("bad window");
    done();
  });
  it ('should return url parameters for -top search', function (done) {
    let message = {};
    message.content = "!imgur -top search";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=top&query=search ");
    done();
  });
  it ('should return url parameters for -top -day search', function (done) {
    let message = {};
    message.content = "!imgur -top -day search";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=top&window=day&query=search ");
    done();
  });
  it ('should return url parameters for -viral search', function (done) {
    let message = {};
    message.content = "!imgur -viral search";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&sort=viral&query=search ");
    done();
  });
  it ('should return url parameters for search and destroy', function (done) {
    let message = {};
    message.content = "!imgur search and destroy";
    let options = message.content.split(/\s/);
    buildQuery(options).should.be.equal("&query=search and destroy ");
    done();
  });
});
