import * as LOGGER from "../admin/log"
import * as Config from "../admin/config"

var request = require('request');
var yt = require('youtube-node');
var youTube = new yt();


export function multimediaInit() {
    youTube.setKey(Config.credentials.googleToken);
}

export function imgurSearch(bot, message) {
  let query = 'https://api.imgur.com/3/gallery/search/?q=' + message.content.substr(6);
  let options = {
    url: query,
    headers: {
      'Authorization' : Config.credentials.imgurId
    }
  };
  request(options, function(error, response, body) {
    if (error) {
      LOGGER.LOG(error, message);
    } else {
      let searchQuery = JSON.parse(body);
      let data = searchQuery.data[0];
      if(searchQuery.status === 200 && data) {
        bot.reply(message, data.link);
      } else if (!data) {
        bot.reply(message, "No results at all !");
      } else {
        bot.reply(message, "I encountered a problem with the search, sorry !");
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
      bot.reply(message, "I encountered a problem with the search, sorry !");
    }
    else {
      bot.reply(message, "http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
    }
  });
}
