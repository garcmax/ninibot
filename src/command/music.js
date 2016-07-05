'use strict'
var fs = require('fs');
var youtube = require('ytdl-core');
var i18n = new config.I18N();
import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

var playList = [];
var notPlaying = true;

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

export function addMusic(bot, options) {
  playList.push(options[1]);   
  console.log(`playlist = ${playList} && notPlaying = ${notPlaying}`);
  if (notPlaying) {
    play(bot);
  }
}

function play(bot) {
  console.log(`url to play = ${playList[0]}`); 
  try {
    let toto = youtube(playList[0], {filter: 'audioonly'})
    bot.voiceConnection.playRawStream(toto, {volume : 0.3 }, function (error, streamIntent) {
      streamIntent.on("error", function (error) {
        console.log("error " + error);
      });
      streamIntent.on("time", function (time) {
        notPlaying = false;
        //console.log("time " + time);
      });
      streamIntent.on("end", function () {
        playList.shift();
        console.log(`end of streaming ${playList}`);        
        if (playList.length >= 1)
          play(bot);
        notPlaying = true;
      });
    });
  } catch (e) {
    console.log(e);
    playList = [];
    notPlaying = true;
  } 
}
