import * as LOGGER from "../admin/log"
import * as config from "../admin/config"
var i18n = new config.I18N();

var request = require('request');
var yt = require('youtube-node');
var youTube = new yt();


export function multimediaInit() {
    youTube.setKey(config.credentials.googleToken);
}

export function imgurSearch(bot, message) {
  let query = 'https://api.imgur.com/3/gallery/search/?q=' + message.content.substr(6);
  let options = {
    url: query,
    headers: {
      'Authorization' : config.credentials.imgurId
    }
  };
  request(options, function(error, response, body) {
    if (error) {
      LOGGER.LOG(error, message);
    } else {
      let searchQuery = JSON.parse(body);
      let data = searchQuery.data[0];
      LOGGER.LOG(data, message);
      if(searchQuery.status === 200 && data) {
        bot.reply(message, data.link);
      } else if (searchQuery.status === 200 && !data) {
        bot.reply(message, config.strings[i18n.language].multimediaSearchKO);
      } else {
        bot.reply(message, config.strings[i18n.language].queryKO);
        LOGGER.LOG(searchQuery, message);
      }
    }
  });
}

export function youTubeSearch(bot, message) {
  LOGGER.LOG(`yt search query : ${message.content.substr(4)}`, message);
  youTube.search(message.content.substr(4), 1, function(error, result) {
    if (error) {
      LOGGER.LOG(error, message);
      bot.reply(message, config.strings[i18n.language].queryKO);
    }
    else {
      bot.reply(message, "http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
    }
  });
}
