'use strict'
var fs = require('fs');
var youtube = require('ytdl-core');
var i18n = new config.I18N();
import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

export function music(bot, message) {
  let vc = message.channel.server.channels;
  let musicChannel;
  for(let i = 0; i < vc.length; i++) {
    if (vc[i].name === "Music") {
      musicChannel = vc[i];
    }
  }
  if (musicChannel && !bot.voiceConnection) {
    bot.sendMessage(message.channel, config.strings[i18n.language].voiceConnectionOK, function (error) {
      if (error) {
        LOGGER.LOG(error, message)
      }
    });
    bot.joinVoiceChannel(musicChannel, function (error) {
      if (error) {
        console.log(error);
        return -1;
      }
      console.log("SUCCESS");
    });
    return 0;
  }
  bot.sendMessage(message.channel, config.strings[i18n.language].voiceConnectionKO, function (error) {
    if (error) {
      LOGGER.LOG(error, message)
    }
  });
  return 1;
}

export function dj(bot, message) {
  if (message.content) {
    let toto = youtube(message.content, {filter: 'audioonly'})
    bot.voiceConnection.playRawStream(toto, {volume : 0.5 }, function (error, streamIntent) {
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
