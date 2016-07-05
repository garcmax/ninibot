'use strict'
var fs = require('fs');
var youtube = require('ytdl-core');
var i18n = new config.I18N();
import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

var playList = [];

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
      playMusic(bot);
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

export function addMusic(options) {
  playList.push(options[1]);   
}

export function playMusic(bot) {
  while (true) {
    let playing = false;
    if (finished && playList.length >= 1) {
      play(bot, playList[0], function (finished) {
        playing = !finished;
        playList.shift();
      });
    }
  }
}

function play(bot, url, finished) {  
  try {
    let toto = youtube(url, {filter: 'audioonly'})
    bot.voiceConnection.playRawStream(toto, {volume : 0.3 }, function (error, streamIntent) {
      streamIntent.on("error", function (error) {
        console.log("error " + error);
      });
      streamIntent.on("time", function (time) {
        console.log("time " + time);
      });
      streamIntent.on("end", function () {
        console.log("end");
        finished(true);
      });
    });
  } catch (e) {
    console.log(e);
    finished(true);
  } 
}
