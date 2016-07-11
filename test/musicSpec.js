'use strict'
var should = require("should");
var sinon = require("sinon");

import * as dj from "../src/command/music";

var bot;


describe('testing connection to music channel', function() {

  before(function() {
      bot = {joinVoiceChannel: function() {},  sendMessage: function() {}};
  });

  it('should connect to Music channel', function (done) {
    let message = {"channel": {"server" : {"channels" : [{"name" : "music", "type":"text"}, {"name" : "Music", "type":"voice"}]}}};
    dj.music(bot, message).should.be.equal(0);
    done();
  });
  it('should not connect to any channel', function (done) {
    let message = {"channel": {"server" : {"channels" : [{"name" : "toto", "type":"text"}, {"name" : "Musique", "type":"voice"}]}}};
    dj.music(bot, message).should.be.equal(1);
    done();
  });
  it('should not connect to any channel', function (done) {
    bot.voiceConnection = "exist";
    let message = {"channel": {"server" : {"channels" : [{"name" : "musique", "type":"text"}, {"name" : "Music", "type":"voice"}]}}};
    dj.music(bot, message).should.be.equal(1);
    done();
  });

});

describe('testing playList management', function() {
  beforeEach(function() {
    sinon.stub(dj, "getPlayList").returns(
      ["titi", "toto"]
      );
  });

  afterEach(function() {
    dj.getPlayList.restore();
  });

  it ('should found nothing to delete ', function(done) { 
    let message = {content: "!del tutu"};
    dj.deleteMusic({}, message).length.should.be.equal(2);
    done();
  })
  it ('should delete the second item', function(done) { 
    let message = {content: "!del toto"};
    dj.deleteMusic({}, message).length.should.be.equal(1);
    done();
  })
  it ('should not delete the first item', function(done) { 
    let message = {content: "!del titi"};
    dj.deleteMusic({}, message).length.should.be.equal(2);
    done();
  })
  it ('should reset the playList', function(done) {
    dj.resetMusic({}, {}).length.should.be.equal(0);
    done();
  })
});
