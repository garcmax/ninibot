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

/**
 * Throw random ECONNRESET error, it will be fixed by newer version of discord.js  
 */
/*export function skip(bot) {  
  try {
    bot.voiceConnection.stopPlaying();
  } catch (e) {
    console.log(e);
  }
}*/

export function deleteMusic(bot, message) {
  let opts = message.content.substr(5);
  let notFound = true;
  let pl = this.getPlayList();
  for (let i = 1; !notFound || i < pl.length; i++) {
    if (pl[i] === opts) {
      notFound = true;
      pl.splice(i, 1);
    }
  }
  this.setPlayList(pl);
  console.log(`playList après le del ${playList}`);
  return pl;
}

export function resetMusic(bot, message) {
  playList = [];  
  bot.reply(message, config.strings[i18n.language].resetMusic);
  return playList;
}

export function addMusic(bot, message) {
  let opts = message.content.substr(10);
  ytSearch(opts, function (error, video) {    
    if (error) {
      bot.reply(message, config.strings[i18n.language].queryKO);
      return 1;
    }
    playList.push(video);
    bot.sendMessage(textMusicChannel, `Adding ${playList[playList.length - 1]} to playlist`);
    if (notPlaying) {
      play(bot);
    }
  });
}

export function getPlayList() {
  return playList;
}

export function setPlayList(pl) {
  playList = pl;
}

function play(bot) {
  console.log(`url to play = ${playList[0]}`);
  try {
    let stream = youtube(playList[0], {filter: 'audioonly'})
    stream.on('info', function(info) {
      console.log(`duration = ${info.length_seconds}`);
      if (info.length_seconds < 600) {
        bot.sendMessage(textMusicChannel, config.strings[i18n.language].nowListening + info.title, function (error) {
          if (error) {
            LOGGER.LOG(error)
          }
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
                setTimeout (function() {
                  play(bot);
                }, 500);
              } else {
                LOGGER.LOG("on finit le game");
                playList = [];
                notPlaying = true;
                return 0;
              }
            });
          });
        });
      } else {
        bot.sendMessage(textMusicChannel, config.strings[i18n.language].musicLengthKO);
        playList.shift();
        if (playList.length >= 1) {
          setTimeout (function() {
            play(bot);
          }, 500);
        } else {
          LOGGER.LOG("on finit le game");
          playList = [];
          notPlaying = true;
          return 0;
        }
      }
    });
  } catch (e) {
    console.log(e);
    playList = [];
    notPlaying = true;
  }
  return 0;
}
