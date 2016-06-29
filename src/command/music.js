'use strict'
var fs = require('fs');
var youtube = require('ytdl-core');

var vc;

export function music(bot, message) {
  vc = message.channel.server.channels[1]
  console.log(vc);
  bot.joinVoiceChannel(vc, function (error) {
    if (error) {
      console.log(error);
      return -1;
    }
    console.log("SUCCESS");
    let url = message.content.substr(7)
    console.log(url);
  });
}

export function dj(bot, message) {
  if (message.content) {
    let toto = youtube(message.content, {filter: 'audioonly'})
    bot.voiceConnection.playRawStream(toto, {volume : 1 }, function (error, streamIntent) {
      streamIntent.on("error", function (error) {
        console.log("error " + error);
      });
      streamIntent.on("time", function (time) {
        console.log("time " + time);
      });
      streamIntent.on("end", function () {
        console.log("end");
      });
    });
  }
  return 1
}
