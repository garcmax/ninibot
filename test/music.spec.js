'use strict'
var should = require("should");
var sinon = require("sinon");
var Discord = require("discord.js");

import * as dj from "../src/command/music";
import * as yt from "../src/utils/ytSearch";



describe('testing connection to music channel', function () {

  var bot = new Discord.Client();
  var botSpy;

  afterEach(function () {
    dj.setTextMusicChannel(null);
  });

  it('should enter dj mode', function (done) {
    botSpy = sinon.stub(bot, "joinVoiceChannel");
    let message = { "channel": { "server": { "channels": [{ "name": "music", "type": "text" }, { "name": "Music", "type": "voice" }] } } };
    let ret = dj.music(bot, message);
    botSpy.calledOnce.should.be.true();
    ret.should.be.equal(0);
    bot.joinVoiceChannel.restore();
    done();
  });
  it('should not enter dj mode due to missing voice music channel', function (done) {
    botSpy = sinon.stub(bot, "sendMessage");
    let message = { "channel": { "server": { "channels": [{ "name": "music", "type": "text" }, { "name": "Musique", "type": "voice" }] } } };
    let ret = dj.music(bot, message);
    botSpy.calledOnce.should.be.true();
    ret.should.be.equal(1);
    bot.sendMessage.restore();
    done();    
  });
  it('should not enter dj mode due to missing text music channel', function (done) {
    botSpy = sinon.stub(bot, "sendMessage");
    let message = { "channel": { "server": { "channels": [{ "name": "musique", "type": "text" }, { "name": "Music", "type": "voice" }] } } };
    let ret = dj.music(bot, message);
    botSpy.calledOnce.should.be.true();
    ret.should.be.equal(1);
    done();
  });
   it('should not enter dj mode due to voiceConnection already existing', function (done) {
    bot = {"voiceConnection" : "true", "sendMessage": function () {}};
    let message = { "channel": { "server": { "channels": [{ "name": "music", "type": "text" }, { "name": "Music", "type": "voice" }] } } };
    let ret = dj.music(bot, message);    
    ret.should.be.equal(1);
    done();
  });

});

describe('testing playList management', function () {

  var bot = new Discord.Client();

  beforeEach(function () {
    dj.setPlayList(["titi", "toto"]);
  });

  afterEach(function () {
    dj.setPlayList([]);
  });

  it('should found nothing to delete ', function (done) {
    let message = { content: "!del tutu" };
    dj.deleteMusic({}, message);
    dj.getPlayList().length.should.be.equal(2);
    done();
  });
  it('should delete the second item', function (done) {
    let message = { content: "!del toto" };
    dj.deleteMusic({}, message);
    dj.getPlayList().length.should.be.equal(1);
    done();
  });
  it('should not delete the first item', function (done) {
    let message = { content: "!del titi" };
    dj.deleteMusic({}, message);
    dj.getPlayList().length.should.be.equal(2);
    done();
  });
  it('should substr the !del command only', function (done) {
    let message = { content: "!dele toto" };
    dj.deleteMusic({}, message);
    dj.getPlayList().length.should.be.equal(2);
    done();
  });
  it('should reset the playList', function (done) {
    let botStub = sinon.stub(bot, "reply");
    dj.resetMusic(bot, {});
    botStub.calledOnce.should.be.true;
    dj.getPlayList().length.should.be.equal(0);    
    bot.reply.restore();
    done();
  });
  it ('should not add the video', function (done) {
    let message = { content: "!add tutu"};
    let replyStub = sinon.stub(bot, "reply");
    let sendMessageStub = sinon.stub(bot, "sendMessage");
    sinon.stub(yt, "ytSearch").callsArgWith(1, {"error":"error"});
    dj.addMusic(bot, message);
    replyStub.calledOnce.should.be.true;
    sendMessageStub.called.should.be.false;
    bot.reply.restore();
    bot.sendMessage.restore();
    yt.ytSearch.restore();
    done();
  });
  it ('should add the video but not call play()', function (done) {
    dj.setPlaying(true);
    let message = { content: "!add tutu"};
    let playSpy = sinon.spy(dj, "play");
    let replyStub = sinon.stub(bot, "reply");
    let sendMessageStub = sinon.stub(bot, "sendMessage");    
    sinon.stub(yt, "ytSearch").callsArgWith(1, undefined, "video");
    dj.addMusic(bot, message);
    replyStub.calledOnce.should.be.false;
    sendMessageStub.called.should.be.true;
    playSpy.called.should.be.false;
    dj.getPlayList()[2].should.be.equal("video");
    bot.reply.restore();
    bot.sendMessage.restore();
    yt.ytSearch.restore();
    dj.play.restore();
    done();
  });
  it ('should add the video and call play()', function (done) {
    dj.setPlaying(false);
    let message = { content: "!add tutu"};
    let playSpy = sinon.stub(dj, "play");
    let replyStub = sinon.stub(bot, "reply");
    let sendMessageStub = sinon.stub(bot, "sendMessage");    
    sinon.stub(yt, "ytSearch").callsArgWith(1, undefined, "video");
    dj.addMusic(bot, message);
    replyStub.calledOnce.should.be.false;
    sendMessageStub.called.should.be.true;
    playSpy.called.should.be.true;
    dj.getPlayList()[2].should.be.equal("video");
    bot.reply.restore();
    bot.sendMessage.restore();
    yt.ytSearch.restore();
    dj.play.restore();
    done();
  });
});

