'use strict';
var fs = require('fs');
var youtube = require('ytdl-core');
import * as LOGGER from "../admin/log";
import * as config from "../admin/config";
var i18n = new config.I18N();
import * as yt from "../utils/ytSearch";

var playList = [];
var textMusicChannel = null;
var playing = false;

export function music(bot, message) {
  let vc = message.channel.server.channels;
  let musicChannel;
  for (let i = 0; i < vc.length; i++) {
    if (vc[i].name === "Music" && vc[i].type === "voice") {
      musicChannel = vc[i];
    } else if (vc[i].name === "music" && vc[i].type === "text") {
      this.setTextMusicChannel(vc[i]);
    }
  }
  let tmc = this.getTextMusicChannel();
  if (musicChannel && tmc && !bot.voiceConnection) {
    bot.joinVoiceChannel(musicChannel, function (error) {
      if (error) {
        LOGGER.LOG(error);
      }
      bot.sendMessage(tmc, config.strings[i18n.language].voiceConnectionOK, function (error) {
        if (error) {
          LOGGER.LOG(error, message);
        }
      });
    });
    return 0;
  }
  bot.sendMessage(message.channel, config.strings[i18n.language].voiceConnectionKO, function (error) {
    if (error) {
      LOGGER.LOG(error, message);
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
  for (let i = 1; notFound && i < pl.length; i++) {
    if (pl[i] === opts) {
      notFound = false;
      pl.splice(i, 1);
    }
  }
  this.setPlayList(pl);
}

export function resetMusic(bot, message) {
  this.setPlayList([]);
  bot.reply(message, config.strings[i18n.language].resetMusic);
}

/**
 * http://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-context-inside-a-callback
 */
export function addMusic(bot, message) {
  let opts = message.content.substr(5);

  let callback = (function (error, video) {
    if (error) {
      bot.reply(message, config.strings[i18n.language].queryKO);
    } else {
      this.getPlayList().push(video);
      bot.sendMessage(textMusicChannel, `Adding ${playList[playList.length - 1]} to playlist`);
      if (!this.isPlaying()) {
        this.play(bot);
      }
    }
  }).bind(this);
  yt.ytSearch(opts, callback);
}

export function getPlayList() {
  return this.playList;
}

export function setPlayList(pl) {
  this.playList = pl;
}

export function getTextMusicChannel() {
  return this.textMusicChannel;
}

export function setTextMusicChannel(tmc) {
  this.textMusicChannel = tmc;
}

export function isPlaying() {
  return this.playing;
}

export function setPlaying(np) {
  this.playing = np;
}

export function play(bot) {
  try {
    let stream = youtube(playList[0], { filter: 'audioonly' });
    stream.on('info', function (info) {
      if (info.length_seconds < 600) {
        bot.sendMessage(this.getTextMusicChannel(), config.strings[i18n.language].nowListening + info.title, function (error) {
          if (error) {
            LOGGER.LOG(error);
          }
          bot.voiceConnection.playRawStream(stream, { volume: 0.3 }, function (error, streamIntent) {
            streamIntent.on("error", function (error) {
              console.log("error " + error);
            });
            streamIntent.on("time", function (time) {
              this.setPlaying(true);
            });
            streamIntent.on("end", function () {
              playList.shift();
              if (playList.length >= 1) {
                setTimeout(function () {
                  play(bot);
                }, 500);
              } else {
                LOGGER.LOG("on finit le game");
                playList = [];
                this.setPlaying(false);
                return 0;
              }
            });
          });
        });
      } else {
        bot.sendMessage(this.getTextMusicChannel(), config.strings[i18n.language].musicLengthKO);
        playList.shift();
        if (playList.length >= 1) {
          setTimeout(function () {
            play(bot);
          }, 500);
        } else {
          LOGGER.LOG("on finit le game");
          playList = [];
          this.setPlaying(false);
          return 0;
        }
      }
    });
  } catch (e) {
    console.log(e);
    playList = [];
    this.setPlaying(false);
  }
  return 0;
}
