'use strict'
var should = require("should");

import {buildQuery, encodeUrl} from "../src/command/multimedia";
import {buildSuffix} from "../src/command/r34"

describe('test on encoding url', function() {
  it('should encode accentuated characters', function (done) {
    let test = encodeUrl("éèäû");
    test.should.be.equal("%C3%A9%C3%A8%C3%A4%C3%BB");
    done();
  });
  it('should encode change space in +', function (done) {
    let test = encodeUrl("a b c");
    test.should.be.equal("a+b+c");
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

describe('rule34', function() {
  it('should return suffix', function (done) {
    let xml = '<posts count="16" offset="0"><post height="1125" score="27" file_url="2" /></posts>'
    buildSuffix(xml).should.be.equal("2");
    done();
  });
  it('should return 1', function (done) {
    let xml = '<posts count="0" offset="0" />'
    buildSuffix(xml).should.be.equal(1);
    done();
  });
});
