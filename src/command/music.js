'use strict'
var fs = require('fs');
var youtube = require('ytdl-core');
var i18n = new config.I18N();
import * as LOGGER from "../admin/log"
import * as config from "../admin/config"
import ytSearch from "../utils/ytSearch"

var playList = [];
export var textMusicChannel;
var notPlaying = true;

export function music(bot, message) {
  let vc = message.channel.server.channels;
  console.log(vc);
  let musicChannel;
  for(let i = 0; i < vc.length; i++) {
    if (vc[i].name === "Music" && vc[i].type === "voice") {
      musicChannel = vc[i];
    } else if (vc[i].name === "music" && vc[i].type === "text") {
      textMusicChannel = vc[i];
    }
  }
  if (musicChannel && textMusicChannel && !bot.voiceConnection) {
    bot.joinVoiceChannel(musicChannel, function (error) {
      if (error) {
        console.log(error);
      }
      bot.sendMessage(textMusicChannel, config.strings[i18n.language].voiceConnectionOK, function (error) {
        if (error) {
          LOGGER.LOG(error, message)
        }
      });
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

/*export function skip(bot) {
  console.log(skip);
  try {
    bot.voiceConnection.stopPlaying();
  } catch (e) {
    console.log(e);
  }
}*/

export function addMusic(bot, message) {
  let opts = message.content.substr(10);
  console.log(`opts = ${opts}`);
  ytSearch(opts, function (error, video) {
    console.log(`retour error = ${error} && video = ${video}`);
    if (error) {
      bot.reply(message, config.strings[i18n.language].queryKO);
      return 1;
    }
    playList.push(video);
    if (notPlaying) {
      play(bot);
    }
  });
}

function play(bot) {
  console.log(`url to play = ${playList[0]}`);
  try {
    let stream = youtube(playList[0], {filter: 'audioonly'})
    stream.on('info', function(info) {
      console.log(`duration = ${info.length_seconds}`);
      bot.sendMessage(textMusicChannel, config.strings[i18n.language].nowListening + info.title, function (error) {
        if (error) {
          LOGGER.LOG(error)
        }
      });
    })
    bot.voiceConnection.playRawStream(stream, {volume : 0.3 }, function (error, streamIntent) {
      streamIntent.on("error", function (error) {
        console.log("error " + error);
      });
      streamIntent.on("time", function (time) {
        notPlaying = false;
      });
      streamIntent.on("end", function () {
        playList.shift();
        if (playList.length >= 1) {
          play(bot);
        }
        notPlaying = true;
      });
    });
  } catch (e) {
    console.log(e);
    playList = [];
    notPlaying = true;
  }
}
