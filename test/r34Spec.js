'use strict'
var should = require("should");

import {buildSuffix} from "../src/command/r34"

describe('testing rule34', function() {
  it('should return filename.jpg', function (done) {
    let xml = '<posts count="16" offset="0"><post height="1125" score="27" file_url="filename.jpg" /></posts>'
    buildSuffix(xml).should.be.equal("filename.jpg");
    done();
  });
  it('should return filename.gif', function (done) {
    let xml = '<posts count="16" offset="0"><post height="1125" score="27" file_url="filename.gif" /></posts>'
    buildSuffix(xml).should.be.equal("filename.gif");
    done();
  });
  it('should return filename.jpeg', function (done) {
    let xml = '<posts count="16" offset="0"><post height="1125" score="27" file_url="filename.jpeg" /></posts>'
    buildSuffix(xml).should.be.equal("filename.jpeg");
    done();
  });
  it('should return filename.png', function (done) {
    let xml = '<posts count="16" offset="0"><post height="1125" score="27" file_url="filename.png" /></posts>'
    buildSuffix(xml).should.be.equal("filename.png");
    done();
  });
  it('should return filename.jpg and not .Webm', function (done) {
    let xml = '<posts count="16" offset="0"><post height="1125" score="27" file_url="filename.webm" /><post height="1125" score="27" file_url="filename.webm" /><post height="1125" score="27" file_url="filename.jpg" /></posts>'
    buildSuffix(xml).should.be.equal("filename.jpg");
    done();
  });
  it('should return 1', function (done) {
    let xml = '<posts count="0" offset="0" />'
    buildSuffix(xml).should.be.equal(1);
    done();
  });
});
