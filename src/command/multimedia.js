import * as LOGGER from "../admin/log"

var request = require('request');
var yt = require('youtube-node');
var youTube = new yt();
var imgurClientId = "Client-ID " + process.env.NODE_IMGUR_CLIENT_ID;

export function multimediaInit() {
    youTube.setKey(process.env.NODE_GOOGLE_API_TOKEN);
}

export function imgurSearch(bot, message) {
  let query = 'https://api.imgur.com/3/gallery/search/?q=' + message.content.substr(6);
  let options = {
    url: query,
    headers: {
      'Authorization' : imgurClientId
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
